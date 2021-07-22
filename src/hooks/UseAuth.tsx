import { gql } from '@apollo/client'
import cloneDeep from 'clone-deep'
import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useSnackbar } from 'notistack'
import omitDeep from 'omit-deep'
import { createContext, useContext, useEffect, useState } from 'react'
import { client } from '../services/api'
import { generateLngLat } from '../utils/lng-lat'

type SignInData = {
  email: string
  password: string
}

type RegisterData = {
  name: string
  email: string
  password: string
}

type UpdateUserData = {
  name: string
  email: string
  cpf?: string
  phone?: string
  address?: {
    street?: string
    number?: number
    neighborhood?: string
    city?: string
    state?: string
    zipCode?: string
  }[]
  profile_picture?: {
    url: string
    filename: string
  }
}

type User = {
  _id: string
  name: string
  email: string
  cpf: string
  phone?: string
  address?: {
    street?: string
    number?: number
    neighborhood?: string
    city?: string
    state?: string
    zipCode?: string
  }[]
  profile_picture?: {
    url: string
    filename: string
  }
  isAdmin: boolean
  created_at: Date
  updated_at: Date
  last_login?: Date
  status: string
  permissions: string[]
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void>
  singOut: () => void
  register: (data: RegisterData) => Promise<void>
  updateUser: (data: UpdateUserData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  const { enqueueSnackbar } = useSnackbar()

  const allowedCities = ['Belo Horizonte']

  const isAuthenticated = !!user

  const reloadUser = async () => {
    const { 'playshape.token': token } = parseCookies()

    if (token) {
      const { data } = await client.query({
        query: gql`
          {
            findUser {
              _id
              name
              email
              cpf
              phone
              address {
                street
                number
                neighborhood
                city
                state
                zipCode
                lat
                lng
              }
              profile_picture {
                url
                filename
              }
              isAdmin
              created_at
              updated_at
              last_login
              status
              permissions
            }
          }
        `
      })
      setUser(data.findUser)
    }
  }

  useEffect(() => {
    reloadUser()
  }, [])

  async function register({ name, email, password }: RegisterData) {
    await client.mutate({
      mutation: gql`
        mutation {
          createUser(input: { name: "${name}", email: "${email}", password: "${password}" }) {
            _id
          }
        }
      `
    })

    enqueueSnackbar('Usuário cadastrado com sucesso', {
      variant: 'success'
    })

    Router.push('/login')
  }

  async function signIn({ email, password }: SignInData) {
    const { data } = await client.query({
      query: gql`
        {
          authenticateUser(
            input: { email: "${email}", password: "${password}" }
          ) {
            user {
              _id
              name
              email
              cpf
              phone
              address {
                street
                number
                neighborhood
                city
                state
                zipCode
                lat
                lng
              }
              profile_picture {
                url
                filename
              }
              isAdmin
              created_at
              updated_at
              last_login
              status
              permissions
            }
            token
          }
        }
      `
    })

    setUser(data.authenticateUser.user)

    setCookie(undefined, 'playshape.token', data.authenticateUser.token, {
      maxAge: 60 * 60 * 1 // 1 hour
    })

    Router.push('/profile')
  }

  async function updateUser(data: UpdateUserData) {
    const dataFiltered = await omitDeep(
      cloneDeep({
        ...data,
        address: await Promise.all(
          data.address.map(async element => {
            let lat = 0
            let lng = 0

            try {
              const { lat: latitude, lng: longitude } = await generateLngLat(
                element
              )

              lat = latitude
              lng = longitude

              const isAllowedCity = allowedCities.some(
                city => city === element.city
              )

              if (!isAllowedCity) {
                throw new Error('error city')
              }
            } catch (error) {
              if (error.message === 'error city') {
                enqueueSnackbar(
                  'Atendemos somente à cidade de Belo Horizonte',
                  {
                    variant: 'error'
                  }
                )
              } else {
                enqueueSnackbar('Endereço inválido', {
                  variant: 'error'
                })
              }

              return false
            }

            if (element.number) {
              return {
                ...element,
                number: Number(element.number),
                lat: String(lat),
                lng: String(lng)
              }
            } else {
              return {
                ...element,
                number: null,
                lat: String(lat),
                lng: String(lng)
              }
            }
          })
        )
      }),
      '__typename'
    )

    if (dataFiltered.address[0]) {
      const { data: dataResponse } = await client.mutate({
        mutation: gql`
          mutation ($data: UpdateUserInput!) {
            updateUser(input: $data) {
              _id
              name
              email
              cpf
              phone
              address {
                street
                number
                neighborhood
                city
                state
                zipCode
                lat
                lng
              }
              profile_picture {
                url
                filename
              }
              isAdmin
              created_at
              updated_at
              last_login
              status
              permissions
            }
          }
        `,
        variables: {
          data: dataFiltered
        }
      })

      setUser(dataResponse.updateUser)

      enqueueSnackbar('Dados atualizados com sucesso', {
        variant: 'success'
      })
    } else {
      return
    }
  }

  function singOut() {
    destroyCookie(undefined, 'playshape.token')

    setUser(null)

    Router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, singOut, register, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
