import Link from 'next/link'
import Router from 'next/router'
import { formatCurrency } from '../../utils/format'
import { Container, Content } from './ProductGroup.style'

interface ProductGroupProps {
  product: {
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
  }
}

export const ProductGroup = ({ product }: ProductGroupProps) => {
  return (
    <Container>
      <Content>
        <img
          src={product.variants[0].picture.url}
          alt={product.name}
          onClick={() => Router.push(`/product/${product.slug}`)}
        />
        <Link href={`/product/${product.slug}`}>
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
        <Link href={`/product/${product.slug}`}>
          <a type="button">Detalhes</a>
        </Link>
      </Content>
    </Container>
  )
}
