import { NextPage } from 'next'
import Head from 'next/head'
import { useShoppingCart } from '../../hooks/UseShoppingCart'

const IndexCart: NextPage = () => {
  const { products } = useShoppingCart()

  return (
    <>
      <Head>
        <title>Carrinho | Playshape</title>
      </Head>
      <h1>Carrinho de compras</h1>
      <div>{JSON.stringify(products)}</div>
    </>
  )
}

export default IndexCart
