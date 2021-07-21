import { gql } from '@apollo/client'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { client } from '../services/api'

interface PaginateContextData {
  products: Products[]
  setProducts: Dispatch<SetStateAction<Products[]>>
  paginate: Paginate
  setPaginate: Dispatch<SetStateAction<Paginate>>
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  type: 'find' | 'search'
  setType: Dispatch<SetStateAction<'find' | 'search'>>
  handlePaginate: (
    search: string,
    searchPage: number,
    type?: 'find' | 'search'
  ) => Promise<void>
}

interface PaginateProviderProps {
  children: ReactNode
}

interface Products {
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
}

interface Paginate {
  totalPages: number
}

const PaginateContext = createContext<PaginateContextData>(
  {} as PaginateContextData
)

export function PaginateProvider({ children }: PaginateProviderProps) {
  const [products, setProducts] = useState<Products[]>([] as Products[])

  const [paginate, setPaginate] = useState<Paginate>({} as Paginate)

  const [search, setSearch] = useState<string>('')

  const [type, setType] = useState<'find' | 'search'>('find')

  const handlePaginate = async (search: string, searchPage: number) => {
    const { data } = await client.query({
      query: gql`
       {
        ${
          type === 'find' ? 'findProducts' : 'searchProducts'
        }(input: {product: {category: {slug: "${search}"}}, limit: 4,page: ${searchPage}}){
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

    setPaginate(data.findProducts)
    setProducts(data.findProducts.products)
  }

  return (
    <PaginateContext.Provider
      value={{
        products,
        setProducts,
        paginate,
        setPaginate,
        search,
        setSearch,
        handlePaginate,
        type,
        setType
      }}
    >
      {children}
    </PaginateContext.Provider>
  )
}

export function usePaginate() {
  const context = useContext(PaginateContext)

  return context
}
