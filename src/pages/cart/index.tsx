import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { TableCart } from '../../components/TableCart/TableCart'
import { TableTotalCart } from '../../components/TableTotalCart/TableTotalCart'
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
        <div id="detailsTotal">
          <img
            src="./images/undraw_empty_cart_co35.svg"
            alt="undraw empty cart"
          />
          <div>
            <TableTotalCart />
            <button>
              <Link href="/payment">Ir para pagamento</Link>
            </button>
          </div>
        </div>
      </Content>
    </Container>
  )
}

export default IndexCart
