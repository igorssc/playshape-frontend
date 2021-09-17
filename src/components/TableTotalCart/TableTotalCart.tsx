import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useShoppingCart } from '../../hooks/UseShoppingCart'
import { formatCurrency } from '../../utils/format'
import { Container, Content } from './TableTotalCart.style'

export const TableTotalCart = () => {
  const { products } = useShoppingCart()

  const somationTotalProducts = () =>
    products.reduce(
      (totalAmmountProducts, product) =>
        (product.promotion ?? product.price) * product.quantitySelected +
        totalAmmountProducts,
      0
    )

  const [total, setTotal] = useState(somationTotalProducts())

  useEffect(() => {
    setTotal(somationTotalProducts())
    console.log('total', total)
    console.log(somationTotalProducts())
  }, [products])

  return (
    <Container>
      <Content>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">TOTAL DO PEDIDO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell align="right">{formatCurrency(total)}</TableCell>
          </TableBody>
        </Table>
      </Content>
    </Container>
  )
}
