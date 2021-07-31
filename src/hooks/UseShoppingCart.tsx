import { useSnackbar } from 'notistack'
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
  quantity: number
  quantitySelected: number
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
  removeProduct: (idProduct: string) => void
  changeQuantity: (idVariantProduct: string, type: 'add' | 'remove') => void
}

interface ShoppingCartProviderProps {
  children: ReactNode
}

const ShoppingCartContext = createContext<ShoppingCartContextData>(
  {} as ShoppingCartContextData
)

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const { enqueueSnackbar } = useSnackbar()

  const [products, setProducts] = useState([] as ProductType[])

  useEffect(() => {
    const savedShoppingCart = localStorage.getItem('shoppingCart')

    savedShoppingCart && setProducts(JSON.parse(savedShoppingCart))
  }, [])

  const addToCart = (product: ProductType) => {
    if (products.some(element => element.idVariant === product.idVariant)) {
      throw new Error(`${product.name} já adicionado ao carrinho`)
    }

    const updatedShoppingCart = [...products, product]

    setProducts(updatedShoppingCart)

    localStorage.setItem('shoppingCart', JSON.stringify(updatedShoppingCart))
  }

  const removeProduct = (idVariantProduct: string) => {
    const updatedShoppingCart = products.filter(
      product => product.idVariant !== idVariantProduct
    )

    setProducts(updatedShoppingCart)

    localStorage.setItem('shoppingCart', JSON.stringify(updatedShoppingCart))

    enqueueSnackbar('Produto removido do carrinho', {
      variant: 'error'
    })
  }

  const changeQuantity = (idVariantProduct: string, type: 'add' | 'remove') => {
    const productSelected = products.find(
      product => product.idVariant === idVariantProduct
    )

    if (!productSelected) {
      throw new Error('Produto não encontrado')
    }

    if (type === 'add') {
      if (productSelected.quantitySelected + 1 > productSelected.quantity) {
        enqueueSnackbar('Quantidade indisponível', {
          variant: 'error'
        })
        throw new Error()
      }
    }

    if (type === 'remove') {
      if (productSelected.quantitySelected === 1) {
        enqueueSnackbar(
          'Não é possível selecionar uma quantidade menor que 1',
          { variant: 'error' }
        )

        throw new Error()
      }
    }
    setProducts(
      products.map(product =>
        product.idVariant === idVariantProduct
          ? {
              ...product,
              quantitySelected:
                type === 'add'
                  ? product.quantitySelected + 1
                  : product.quantitySelected - 1
            }
          : product
      )
    )
  }

  return (
    <ShoppingCartContext.Provider
      value={{ products, addToCart, removeProduct, changeQuantity }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext)

  return context
}
