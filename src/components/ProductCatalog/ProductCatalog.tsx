import { useEffect } from 'react'
import { usePaginate } from '../../hooks/UsePaginate'
import { ButtonPagination } from '../Buttons/Pagination/ButtonPagination'
import { ProductGroup } from '../ProductGroup/ProductGroup'
import { Container, Content } from './ProductCatalog.style'

interface ProductCatalogProps {
  title: string
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
  paginate?: {
    totalPages: number
  }
  handlePaginate?: (searchPage: number) => void
  search?: string
  type?: 'find' | 'search'
}

export const ProductCatalog = ({
  products: productsDefault,
  title,
  search,
  type,
  paginate: paginateDefault
}: ProductCatalogProps) => {
  const { products, paginate, setProducts, setPaginate, setSearch, setType } =
    usePaginate()

  useEffect(() => {
    setPaginate(paginateDefault)
    setProducts(productsDefault)
    search && setSearch(search)
    type && setType(type)
  }, [])

  return (
    <Container>
      <Content>
        <h1>{title}</h1>
        <main>
          <div>
            {products.map(product => (
              <ProductGroup product={product} key={product._id} />
            ))}
          </div>

          {paginate && (
            <footer>
              <ButtonPagination />
            </footer>
          )}
        </main>
      </Content>
    </Container>
  )
}
