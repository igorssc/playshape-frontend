import gql from 'graphql-tag'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'
import { DetailsStore } from '../../components/DetailsStore/DetailsStore'
import { ProductCatalog } from '../../components/ProductCatalog/ProductCatalog'
import { PaginateProvider } from '../../hooks/UsePaginate'
import { client } from '../../services/api'

interface StorePageProps {
  children?: ReactNode
  store: {
    _id: string
    name: string
    phone: string
    address: {
      street: string
      number: number
      neighborhood: string
      city: string
      state: string
      zipCode: string
      lat?: string
      lng?: string
    }
    profile_picture: {
      url: string
    }
    created_at: string
    status: string
  }
  products: {
    _id: string
    name: string
    description: string
    brand: string
    slug: string
    store: {
      name: string
      slug: string
    }
    variants: {
      price: string
      promotion: string
      picture: {
        url: string
      }
    }[]
  }[]
  paginate: {
    totalPages: number
  }
}

const StorePage: NextPage = ({ store, products, paginate }: StorePageProps) => {
  return (
    <PaginateProvider>
      <Head>
        <title>{store.name} | Playshape</title>
      </Head>
      <DetailsStore store={store} />
      <ProductCatalog
        products={products}
        title={`Produtos disponíveis de ${store.name}`}
      />
    </PaginateProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params

  try {
    const { data } = await client.query({
      query: gql`
      {
        findStore(input: { slug: "${String(slug)}" }) {
          _id
          name
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
          }
          created_at
          status
        }

        findProducts(input: {product: {store: {slug: "${String(
          slug
        )}"}}, limit: 12}) {
          products {
            _id
            name
            description
            brand
            slug
            store {
              name
              slug
            }
            variants {
              price
              promotion
              picture {
                url
              }
            }
          }
          totalPages
        }
      }
    `
    })

    return {
      props: {
        store: data.findStore,
        products: data.findProducts.products,
        paginate: data.findProducts
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}

export default StorePage
