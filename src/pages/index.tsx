import { gql } from '@apollo/client'
import { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import { ReactNode } from 'react'
import { CarrouselCategories } from '../components/CarrouselCategories/CarrouselCategories'
import { InitialMessage } from '../components/InitialMessage/InitialMessage'
import { ProductCatalog } from '../components/ProductCatalog/ProductCatalog'
import { SubscribeNewsletter } from '../components/SubscribeNewsletter/SubscribeNewsletter'
import { client } from '../services/api'

interface IndexPageProps {
  children: ReactNode
  categories: {
    _id: string
    slug: string
    name: string
  }[]
  products: {
    _id: string
    name: string
    description: string
    status: string
    brand: string
    slug: string
    category: {
      _id: string
      name: string
      description: string
      updated_at: string
      created_at: string
    }[]
    store: {
      _id: string
      name: string
      slug: string
      profile_picture: {
        url: string
      }
      status: string
    }
    variants: {
      _id: string
      product: string
      size: string
      flavor: string
      price: string
      promotion: string
      quantity: string
      picture: {
        url: string
      }
    }[]
  }[]
}

const IndexPage: NextPage = (props: IndexPageProps) => {
  const [session, loading] = useSession()
  return (
    <>
      <Head>
        <title>Home | Playshape</title>
      </Head>
      <InitialMessage />
      <CarrouselCategories categories={props.categories} />
      <ProductCatalog
        title={'Produtos mais vendidos'}
        products={props.products}
      />
      <SubscribeNewsletter />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      {
        listProducts(input: { limit: 8 }) {
          products {
            _id
            name
            description
            status
            brand
            slug
            category {
              _id
              name
              description
              updated_at
              created_at
            }
            store {
              _id
              name
              slug
              profile_picture {
                url
              }
              status
            }
            variants {
              _id
              product
              size
              flavor
              price
              promotion
              quantity
              picture {
                url
              }
            }
          }
        }

        listAllCategories(input: { limit: 100 }) {
          categories {
            _id
            name
            slug
          }
        }
      }
    `
  })

  return {
    props: {
      products: data.listProducts.products,
      categories: data.listAllCategories.categories
    },
    revalidate: 60
  }
}

export default IndexPage
