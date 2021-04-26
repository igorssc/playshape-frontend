import gql from 'graphql-tag'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactNode, useState } from 'react'
import { ProductCatalog } from '../components/ProductCatalog/ProductCatalog'
import { client } from '../services/api'
import { Container } from '../styles/pages/Search'

interface SearchPageProps {
  children: ReactNode
  search: string
  products: {
    _id: string
    name: string
    description: string
    status: string
    brand: string
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
        filename: string
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

const SearchPage: NextPage = ({
  products,
  paginate,
  search
}: SearchPageProps) => {
  const [productsState, setProductsState] = useState<
    SearchPageProps['products']
  >(products)

  const [paginateState, setPaginateState] = useState<
    SearchPageProps['paginate']
  >(paginate)

  const handlePaginate = async (searchPage: number) => {
    const { data } = await client.query({
      query: gql`
      query FindStore {
        findProductsByName(input: {name: "${search}", limit: 4, page: ${searchPage}}) {
          products {
            _id
            name
            description
            status
            brand
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
                filename
              }
            }
          }
          totalDocs
          limit
          totalPages
          page
          pagingCounter
          hasPrevPage
          hasNextPage
          prevPage
          nextPage
        }
      }
    `
    })

    setPaginateState(data.findProductsByName)
    setProductsState(data.findProductsByName.products)
  }

  return (
    <Container>
      <Head>
        <title>{search} | Playshape</title>
      </Head>
      <ProductCatalog
        title={`Resultado da pesquisa para ${search}`}
        products={productsState}
        paginate={paginateState}
        handlePaginate={handlePaginate}
      />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await client.query({
    query: gql`
      query FindStore {
        findProductsByName(input: {name: "${query.q}", limit: 4}) {
          products {
            _id
            name
            description
            status
            brand
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
                filename
              }
            }
          }
          totalDocs
          limit
          totalPages
          page
          pagingCounter
          hasPrevPage
          hasNextPage
          prevPage
          nextPage
        }
      }
    `
  })

  return {
    props: {
      search: String(query.q),
      products: data.findProductsByName.products,
      paginate: data.findProductsByName
    }
  }
}

export default SearchPage
