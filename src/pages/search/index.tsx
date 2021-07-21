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
