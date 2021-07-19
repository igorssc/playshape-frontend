import gql from 'graphql-tag'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactNode, useEffect, useState } from 'react'
import { ProductCatalog } from '../../components/ProductCatalog/ProductCatalog'
import { client } from '../../services/api'

interface IndexSearchProps {
  children: ReactNode
  search: string
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

const IndexSearch: NextPage = ({
  products,
  paginate,
  search
}: IndexSearchProps) => {
  const [productsState, setProductsState] =
    useState<IndexSearchProps['products']>(products)

  const [paginateState, setPaginateState] =
    useState<IndexSearchProps['paginate']>(paginate)

  useEffect(() => {
    setProductsState(products)
    setPaginateState(paginate)
  }, [products])

  const handlePaginate = async (searchPage: number) => {
    const { data } = await client.query({
      query: gql`
      {
        searchProducts(input: {value: "${search}", limit: 4,page: ${searchPage}}){
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

    setPaginateState(data.searchProducts)
    setProductsState(data.searchProducts.products)
  }

  return (
    <>
      <Head>
        <title>{search} | Playshape</title>
      </Head>
      <ProductCatalog
        title={`Resultado da pesquisa para: ${search}`}
        products={productsState}
        paginate={paginateState}
        handlePaginate={handlePaginate}
      />
    </>
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
      products: data.searchProducts.products,
      paginate: data.searchProducts
    }
  }
}

export default IndexSearch
