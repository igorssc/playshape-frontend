import { ButtonPagination } from '../Buttons/Pagination/ButtonPagination'
import { ProductGroup } from '../ProductGroup/ProductGroup'
import { Container, Content } from './ProductCatalog.style'

interface ProductCatalogProps {
  title: string
  products: {
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
  paginate?: {
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
  handlePaginate?: (searchPage: number) => void
}

export const ProductCatalog = ({
  products,
  title,
  paginate,
  handlePaginate
}: ProductCatalogProps) => {
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
              <ButtonPagination
                handlePaginate={handlePaginate}
                paginate={paginate}
              />
            </footer>
          )}
        </main>
      </Content>
    </Container>
  )
}
