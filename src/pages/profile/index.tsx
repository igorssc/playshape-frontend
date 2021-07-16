import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Container } from '../../styles/pages/Login'

const IndexProfile: NextPage = () => {
  const { user } = useContext(AuthContext)

  return (
    <Container>
      <Head>
        <title>Perfil | Playshape</title>
      </Head>
      {console.log(user)}
      {user?.name}
    </Container>
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
