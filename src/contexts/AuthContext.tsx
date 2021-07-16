import { gql } from '@apollo/client'
import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, useEffect, useState } from 'react'
import { client } from '../services/api'

type SignInData = {
  email: string
  password: string
}

type RegisterData = {
  name: string
  email: string
  password: string
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
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

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

    setCookie(undefined, 'playshape.token', data.authenticateUser.token, {
      maxAge: 60 * 60 * 1 // 1 hour
    })

    setUser(data.authenticateUser.user)

    Router.push('/profile')
  }

  function singOut() {
    destroyCookie(undefined, 'playshape.token')

    setUser(null)

    Router.push('/')
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, singOut, register }}
    >
      {children}
    </AuthContext.Provider>
  )
}
