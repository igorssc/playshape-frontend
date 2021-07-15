import { NextPage } from 'next'
import Head from 'next/head'
import { FormRegister } from '../../components/FormRegister/FormRegister'
import { RegisterMessage } from '../../components/RegisterMessage/RegisterMessage'
import { Container } from '../../styles/pages/Login'

const IndexRegister: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Login | Playshape</title>
      </Head>
      <h1>Cadastre-se e venha fazer parte</h1>
      <div>
        <RegisterMessage />
        <FormRegister />
      </div>
    </Container>
  )
}

export default IndexRegister
