import { Chip } from '@material-ui/core'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import { Dispatch, SetStateAction } from 'react'
import { useShoppingCart } from '../../hooks/UseShoppingCart'
import { formatCurrency } from '../../utils/format'
import { Select } from '../Select/Select'
import { Container, Content } from './DetailsProduct.style'

type VariantType = {
  _id: string
  size: string
  flavor: string
  price: number
  promotion: number
  quantity: number
  picture: {
    url: string
  }
}
interface DetailsProductProps {
  product: {
    _id: string
    name: string
    description: string
    slug: string
    brand: string
    status: string
    category: {
      name: string
      slug: string
    }[]
    store: {
      name: string
      slug: string
    }
    variants: VariantType[]
  }
  variant: VariantType
  setVariant: Dispatch<SetStateAction<VariantType>>
  sizes: string[]
  flavors: string[]
}

export const DetailsProduct = ({
  product,
  variant,
  setVariant,
  sizes,
  flavors
}: DetailsProductProps) => {
  const { products: productsShoppingCart, addToCart } = useShoppingCart()
  const { enqueueSnackbar } = useSnackbar()

  return (
    <Container>
      <Content>
        <h1>{product.name}</h1>

        <main>
          <div>
            <div>
              <img
                src={variant.picture.url}
                alt={`Foto do produto: ${product.name}`}
              />
            </div>
            <div>
              <h2>
                Vendido por{' '}
                <Link href={`/store/${product.store.slug}`}>
                  <a>{product.store.name}</a>
                </Link>
              </h2>
              <p>{product.brand}</p>
              <div className="categories">
                {product.category.map(element => (
                  <Link href={`/category/${element.slug}`}>
                    <Chip variant="outlined" label={element.name} />
                  </Link>
                ))}
              </div>
              <form action="#">
                <Select
                  label="Tamanho"
                  items={sizes}
                  value={variant.size}
                  onChange={e => {
                    setVariant(
                      product.variants.find(
                        variant => variant.size == String(e.target.value)
                      )
                    )
                  }}
                />

                <Select
                  label="Sabor"
                  items={flavors}
                  value={variant.flavor}
                  onChange={e => {
                    setVariant(
                      product.variants.find(
                        variant =>
                          variant.flavor === String(e.target.value) &&
                          variant.size === variant.size
                      )
                    )
                  }}
                />
              </form>
              <div className="details">
                <p>{variant.quantity} disponíveis</p>
                {variant.promotion ? (
                  <>
                    <h3>De: {formatCurrency(variant.price)}</h3>
                    <h2>Por: {formatCurrency(variant.promotion)}</h2>
                  </>
                ) : (
                  <h2>{formatCurrency(variant.price)}</h2>
                )}
              </div>
              <div>
                <button
                  disabled={productsShoppingCart.some(
                    element => element.idVariant === variant._id
                  )}
                  onClick={() => {
                    try {
                      addToCart({
                        id: product._id,
                        idVariant: variant._id,
                        name: product.name,
                        description: product.description,
                        slug: product.slug,
                        size: variant.size,
                        brand: product.brand,
                        price: variant.price,
                        promotion: variant.promotion ?? null,
                        photoUrl: variant.picture.url,
                        store: {
                          name: product.store.name,
                          slug: product.store.slug
                        },
                        category: product.category.map(element => {
                          return { name: element.name, slug: element.slug }
                        })
                      })

                      enqueueSnackbar(
                        `${product.name} adicionado ao carrinho de compras`,
                        { variant: 'success' }
                      )
                    } catch (error) {
                      enqueueSnackbar(error.message, { variant: 'error' })
                    }
                  }}
                >
                  {productsShoppingCart.some(
                    element => element.idVariant === variant._id
                  )
                    ? 'Adicionado ao carrinho'
                    : 'Adicionar ao carrinho'}
                </button>
                <button>Comprar</button>
              </div>
            </div>
          </div>
          <div>
            <h1>Descrição</h1>
            <p>{product.description}</p>
          </div>
        </main>
      </Content>
    </Container>
  )
}
