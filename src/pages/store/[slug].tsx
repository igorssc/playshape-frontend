import gql from 'graphql-tag'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'
import { DetailsStore } from '../../components/DetailsStore/DetailsStore'
import { ProductCatalog } from '../../components/ProductCatalog/ProductCatalog'
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
      lat: string
      lng: string
    }[]
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
  paginate: {
    totalDocs: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number
    nextPage: number
  }
}

const StorePage: NextPage = ({ store, products, paginate }: StorePageProps) => {
  return (
    <>
      <Head>
        <title>{store.name} | Playshape</title>
      </Head>
      <DetailsStore store={store} />
      <ProductCatalog
        products={products}
        title={`Produtos disponíveis de ${store.name}`}
      />
    </>
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

        findProducts(input: {product: {store: {slug: "${String(slug)}"}}}) {
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
  } catch {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}

export default StorePage
