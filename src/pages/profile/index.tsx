import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { useContext } from 'react'
import { FormProfile } from '../../components/FormProfile/FormProfile'
import { AuthContext } from '../../contexts/AuthContext'

const IndexProfile: NextPage = () => {
  const { user } = useContext(AuthContext)

  return (
    <>
      <Head>
        <title>Perfil | Playshape</title>
      </Head>
      <FormProfile />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['playshape.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default IndexProfile
