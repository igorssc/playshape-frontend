import gql from 'graphql-tag'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'
import { ProductCatalog } from '../../components/ProductCatalog/ProductCatalog'
import { PaginateProvider } from '../../hooks/UsePaginate'
import { client } from '../../services/api'

interface IndexSearchProps {
  children: ReactNode
  search: string
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

const IndexSearch: NextPage = ({
  products,
  paginate,
  search
}: IndexSearchProps) => {
  return (
    <PaginateProvider>
      <Head>
        <title>{search} | Playshape</title>
      </Head>
      <ProductCatalog
        title={`Resultado da pesquisa para: ${search}`}
        type="search"
        search={search}
        products={products}
        paginate={paginate}
      />
    </PaginateProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await client.query({
    query: gql`
        {
          searchProducts(input: {value: "${query.q}", limit: 4}) {
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
      search: String(query.q),
      products: data.searchProducts.products,
      paginate: data.searchProducts
    }
  }
}

export default IndexSearch
