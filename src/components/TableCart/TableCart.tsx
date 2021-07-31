import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import React from 'react'
import { useShoppingCart } from '../../hooks/UseShoppingCart'
import { formatCurrency } from '../../utils/format'
import { Container, Content, IconRemoveProduct } from './TableCart.style'

export const TableCart = () => {
  const { products, removeProduct, changeQuantity } = useShoppingCart()

  return (
    <Container>
      <Content>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">PRODUTO</TableCell>
              <TableCell align="left">PREÇO</TableCell>
              <TableCell align="left">QUANTIDADE</TableCell>
              <TableCell align="left">TOTAL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow>
                <TableCell>
                  <IconRemoveProduct
                    onClick={() => removeProduct(product.idVariant)}
                  />
                </TableCell>
                <TableCell>
                  <div className="details">
                    <img src={product.photoUrl} alt={product.name} />
                    {product.name}
                  </div>
                </TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  <div className="productQuantity">
                    <div>
                      <NavigateBeforeIcon
                        onClick={() => {
                          try {
                            changeQuantity(product.idVariant, 'remove')
                          } catch {}
                        }}
                      />
                    </div>
                    <div>{product.quantitySelected}</div>
                    <div>
                      <NavigateNextIcon
                        onClick={() => {
                          try {
                            changeQuantity(product.idVariant, 'add')
                          } catch {}
                        }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {formatCurrency(product.price * product.quantitySelected)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Content>
    </Container>
  )
}
