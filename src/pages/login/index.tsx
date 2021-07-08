import { NextPage } from 'next'
import Head from 'next/head'
import { FormLogin } from '../../components/FormLogin/FormLogin'
import { LoginMessage } from '../../components/LoginMessage/LoginMessage'
import { Container } from '../../styles/pages/Login'

const IndexLogin: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Login | Playshape</title>
      </Head>
      <h1>Cadastre-se ou acesse sua conta</h1>
      <div>
        <LoginMessage />
        <FormLogin />
      </div>
    </Container>
  )
}

export default IndexLogin
