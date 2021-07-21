import { Avatar } from '@material-ui/core'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import MenuComponent from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../../hooks/UseAuth'
import { useShoppingCart } from '../../hooks/UseShoppingCart'
import { ButtonTheme } from '../Buttons/Theme/ButtonTheme'
import { Container, Content } from './Menu.style'

interface MenuProps {
  handleTheme: () => void
}

export const Menu: React.FC<MenuProps> = props => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { isAuthenticated, user, singOut } = useAuth()

  const { products } = useShoppingCart()

  const handleExit = () => {
    handleClose()
    singOut()
  }

  return (
    <Container>
      <Content>
        <ul>
          <ButtonTheme handleTheme={props.handleTheme} />
        </ul>
        <ul>
          {!isAuthenticated && (
            <li>
              <Link href="/login">
                <a>Entrar</a>
              </Link>
            </li>
          )}

          {isAuthenticated && (
            <>
              <p>Olá, {user.name.split(' ')[0]}</p>
              <li>
                <IconButton
                  color="inherit"
                  onClick={handleMenu}
                  aria-haspopup="true"
                  aria-controls="menu-appbar"
                  aria-label="account of current user"
                >
                  <Avatar
                    alt={user?.name}
                    src={user?.profile_picture?.url}
                  ></Avatar>
                </IconButton>
                <MenuComponent
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href="/profile">Meu perfil</Link>
                  </MenuItem>
                  <MenuItem onClick={handleExit}>Sair</MenuItem>
                </MenuComponent>
              </li>
            </>
          )}
          <li className="shoppingCart">
            <IconButton aria-label="cart">
              <Badge badgeContent={products.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </li>
        </ul>
      </Content>
    </Container>
  )
}
