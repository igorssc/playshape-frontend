import gql from 'graphql-tag'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactNode, useEffect, useState } from 'react'
import { DetailsProduct } from '../../components/DetailsProduct/DetailsProduct'
import { ProductCatalog } from '../../components/ProductCatalog/ProductCatalog'
import { client } from '../../services/api'

interface ProductPageProps {
  children: ReactNode
  product: {
    _id: string
    name: string
    description: string
    status: string
    brand: string
    category: {
      _id: string
      name: string
      description: string
    }[]
    store: {
      _id: string
      name: string
      slug: string
      profile_picture: {
        url: string
        filename: string
      }
      status: string
    }
    variants: {
      _id: string
      product: string
      size: string
      flavor: string
      price: number
      promotion: number
      quantity: number
      picture: {
        url: string
        filename: string
      }
    }[]
  }
  relatedProducts: {
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
}

const ProductPage: NextPage = ({
  product,
  relatedProducts
}: ProductPageProps) => {
  const [variant, setVariant] = useState<
    ProductPageProps['product']['variants'][0]
  >(product.variants[0])

  const [sizeSelected, setSizeSelected] = useState<string>(
    product.variants[0].size
  )
  const [flavorSelected, setFlavorSelected] = useState<string>(
    product.variants[0].flavor
  )

  const sizes = product.variants
    .map(variant => variant.size)
    .filter((value, index, product) => product.indexOf(value) === index)

  const flavors = product.variants
    .filter(variant => variant.size === sizeSelected)
    .map(variant => variant.flavor)

  useEffect(() => {
    setVariant(product.variants[0])
    setSizeSelected(product.variants[0].size)
    setFlavorSelected(product.variants[0].flavor)
  }, [product])

  return (
    <>
      <Head>
        <title>{product.name} | Playshape</title>
      </Head>
      <DetailsProduct
        product={product}
        variant={variant}
        setVariant={setVariant}
        size={sizeSelected}
        setSize={setSizeSelected}
        flavor={flavorSelected}
        setFlavor={setFlavorSelected}
        sizes={sizes}
        flavors={flavors}
      />
      <ProductCatalog
        products={relatedProducts}
        title="Produtos relacionados"
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params

  try {
    const { data: dataProduct } = await client.query({
      query: gql`
      {
        findProduct(input: {_id: "${id}"}) {
          _id
          name
          description
          status
          brand
          category {
            _id
            name
            description
          }
          store {
            _id
            name
            slug
            profile_picture {
              url
              filename
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
      }
    `
    })

    const { data: dataRelatedProducts } = await client.query({
      query: gql`
      {
        findProductsByStoreId(input: { store: "${String(
          dataProduct.findProduct.store._id
        )}", limit: 4}) {
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
        }
      }
    `
    })

    return {
      props: {
        product: dataProduct.findProduct,
        relatedProducts: dataRelatedProducts.findProductsByStoreId.products
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
