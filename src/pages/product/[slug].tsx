import gql from 'graphql-tag'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactNode, useEffect, useState } from 'react'
import { DetailsProduct } from '../../components/DetailsProduct/DetailsProduct'
import { ProductCatalog } from '../../components/ProductCatalog/ProductCatalog'
import { PaginateProvider } from '../../hooks/UsePaginate'
import { client } from '../../services/api'

interface ProductPageProps {
  children: ReactNode
  product: {
    _id: string
    name: string
    description: string
    status: string
    slug: string
    brand: string
    category: {
      name: string
      slug: string
    }[]
    store: {
      name: string
      slug: string
    }
    variants: {
      _id: string
      size: string
      flavor: string
      price: number
      promotion: number
      quantity: number
      picture: {
        url: string
      }
    }[]
  }
  relatedProducts: {
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
}

const ProductPage: NextPage = ({
  product,
  relatedProducts
}: ProductPageProps) => {
  const [variant, setVariant] = useState<
    ProductPageProps['product']['variants'][0]
  >(product.variants[0])

  useEffect(() => {
    setVariant(product.variants[0])
  }, [product])

  const sizes = product.variants
    .map(variant => variant.size)
    .filter((value, index, product) => product.indexOf(value) === index)

  const flavors = product.variants
    .filter(Cvariant => Cvariant.size === variant.size)
    .map(variant => variant.flavor)

  return (
    <PaginateProvider>
      <Head>
        <title>{product.name} | Playshape</title>
      </Head>
      <DetailsProduct
        product={product}
        variant={variant}
        setVariant={setVariant}
        sizes={sizes}
        flavors={flavors}
      />
      <ProductCatalog
        title="Produtos relacionados"
        products={relatedProducts}
      />
    </PaginateProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params

  try {
    const { data: dataProduct } = await client.query({
      query: gql`
      {
        findProduct(input: {slug: "${slug}"}) {
          _id
          name
          description
          slug
          brand
          category {
            _id
            name
            description
            slug
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
    `
    })

    const { data: dataRelatedProducts } = await client.query({
      query: gql`
      {
        findProductsRelated(input: {_id: "${String(
          dataProduct.findProduct._id
        )}", limit: 4}){
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
        product: dataProduct.findProduct,
        relatedProducts: dataRelatedProducts.findProductsRelated.products
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

export default ProductPage
