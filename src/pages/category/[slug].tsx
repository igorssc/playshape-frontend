import gql from 'graphql-tag'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'
import { ProductCatalog } from '../../components/ProductCatalog/ProductCatalog'
import { PaginateProvider } from '../../hooks/UsePaginate'
import { client } from '../../services/api'

interface CategoryPageProps {
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
  return (
    <PaginateProvider>
      <Head>
        <title>{category.name} | Playshape</title>
      </Head>
      <ProductCatalog
        title={`Resultado da categoria: ${category.name}`}
        type={'find'}
        search={search}
        products={products}
        paginate={paginate}
      />
    </PaginateProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { slug } = ctx.params

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
