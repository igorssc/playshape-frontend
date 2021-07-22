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
    type?: 'find' | 'search',
    limit?: number
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

  const handlePaginate = async (
    search: string,
    searchPage: number,
    type: 'find' | 'search',
    limit: number = 4
  ) => {
    const { data } = await client.query({
      query: gql`
       {
        ${type === 'find' ? 'findProducts' : 'searchProducts'}(input: {${
        type === 'find'
          ? `product: {category: {slug: "${search}"}}`
          : `value: "${search}"`
      }, limit: ${limit}, page: ${searchPage}}){
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

    setPaginate(type === 'find' ? data.findProducts : data.searchProducts)
    setProducts(
      type === 'find'
        ? data.findProducts.products
        : data.searchProducts.products
    )
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
