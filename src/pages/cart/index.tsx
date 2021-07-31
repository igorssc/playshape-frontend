import { NextPage } from 'next'
import Head from 'next/head'
import { TableCart } from '../../components/TableCart/TableCart'
import { Container, Content } from '../../styles/pages/Cart'

const IndexCart: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Carrinho | Playshape</title>
      </Head>

      <Content>
        <h1>Carrinho de compras</h1>
        <TableCart />
      </Content>
    </Container>
  )
}

export default IndexCart
