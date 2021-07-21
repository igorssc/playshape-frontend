import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

type ProductType = {
  id: string
  idVariant: string
  name: string
  description: string
  slug: string
  size: string
  brand: string
  quantity?: number
  price: number
  promotion?: number
  photoUrl: string
  store: {
    name: string
    slug: string
  }
  category: {
    name: string
    slug: string
  }[]
}

interface ShoppingCartContextData {
  products: ProductType[]
  addToCart: (product: ProductType) => void
}

interface ShoppingCartProviderProps {
  children: ReactNode
}

const ShoppingCartContext = createContext<ShoppingCartContextData>(
  {} as ShoppingCartContextData
)

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [products, setProducts] = useState([] as ProductType[])

  useEffect(() => {
    const savedShoppingCart = localStorage.getItem('shoppingCart')

    savedShoppingCart && setProducts(JSON.parse(savedShoppingCart))
  }, [])

  const addToCart = (product: ProductType) => {
    if (products.some(element => element.idVariant === product.idVariant)) {
      throw new Error(`${product.name} já adicionado ao carrinho`)
    }

    const updatedShoppingCart = [...products, { ...product, quantity: 1 }]

    setProducts(updatedShoppingCart)

    localStorage.setItem('shoppingCart', JSON.stringify(updatedShoppingCart))
  }

  return (
    <ShoppingCartContext.Provider value={{ products, addToCart }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext)

  return context
}
