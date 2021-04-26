import Link from 'next/link'
import { formatCurrency } from '../../utils/format'
import { Container, Content } from './ProductGroup.style'

interface ProductGroupProps {
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
  }
}

export const ProductGroup = ({ product }: ProductGroupProps) => {
  return (
    <Container>
      <Content>
        <img src={product.variants[0].picture.url} alt={product.name} />
        <Link href={`/product/${product._id}`}>
          <a className="name">
            <h1>{product.name}</h1>
          </a>
        </Link>
        <h2>{product.brand}</h2>
        <h2>
          Vendido por{' '}
          <Link href={`/store/${product.store.slug}`}>
            <a>{product.store.name}</a>
          </Link>
        </h2>
        {product.variants[0].promotion ? (
          <>
            <h4>{formatCurrency(Number(product.variants[0].price))}</h4>
            <h3>{formatCurrency(Number(product.variants[0].promotion))}</h3>
          </>
        ) : (
          <h3>{formatCurrency(Number(product.variants[0].price))}</h3>
        )}
        <p>
          {product.description.length > 100
            ? `${product.description.substr(0, 100)}...`
            : product.description}
        </p>
        <Link href={`/product/${product._id}`}>
          <a type="button">Detalhes</a>
        </Link>
      </Content>
    </Container>
  )
}
