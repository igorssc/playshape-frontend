import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Link from 'next/link'
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
              <TableCell align="left">SUBTOTAL</TableCell>
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
                    <Link href={`/product/${product.slug}`}>
                      <a
                        href={`/product/${product.slug}`}
                        style={{ cursor: 'pointer' }}
                      >
                        {product.name}
                      </a>
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  {formatCurrency(product.promotion ?? product.price)}
                </TableCell>
                <TableCell>
                  <div className="productQuantity">
                    <div
                      onClick={() => {
                        try {
                          changeQuantity(product.idVariant, 'remove')
                        } catch {}
                      }}
                    >
                      <NavigateBeforeIcon />
                    </div>
                    <div>{product.quantitySelected}</div>
                    <div
                      onClick={() => {
                        try {
                          changeQuantity(product.idVariant, 'add')
                        } catch {}
                      }}
                    >
                      <NavigateNextIcon />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {formatCurrency(
                    (product.promotion ?? product.price) *
                      product.quantitySelected
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Content>
    </Container>
  )
}
