import gql from 'graphql-tag'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactNode, useState } from 'react'
import { ProductCatalog } from '../../components/ProductCatalog/ProductCatalog'
import { client } from '../../services/api'

interface CategoryPageProps {
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
  category: {
    name: string
    description: string
  }
}

const CategoryPage: NextPage = ({
  products,
  paginate,
  search,
  category
}: CategoryPageProps) => {
  const [productsState, setProductsState] = useState<
    CategoryPageProps['products']
  >(products)

  const [paginateState, setPaginateState] = useState<
    CategoryPageProps['paginate']
  >(paginate)

  const handlePaginate = async (searchPage: number) => {
    const { data } = await client.query({
      query: gql`
       {
        findProducts(input: {product: {category: {slug: "${search}"}}, limit: 4,page: ${searchPage}}){
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

    setPaginateState(data.findProducts)
    setProductsState(data.findProducts.products)
  }

  return (
    <>
      <Head>
        <title>{search} | Playshape</title>
      </Head>
      <ProductCatalog
        title={`Resultado da categoria: ${category.name}`}
        products={productsState}
        paginate={paginateState}
        handlePaginate={handlePaginate}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params

  const { data } = await client.query({
    query: gql`
      query FindStore {
        findProducts(input: {product: {category: {slug: "${String(
          slug
        )}"}},limit: 4}) {
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

        findCategory(input: {slug: "${String(slug)}"}) {
          name
          description
        }
      }
    `
  })

  return {
    props: {
      search: String(slug),
      products: data.findProducts.products,
      paginate: data.findProducts,
      category: data.findCategory
    }
  }
}

export default CategoryPage
