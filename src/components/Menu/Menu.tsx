import { Avatar } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuComponent from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
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

  const { isAuthenticated, user, singOut } = useContext(AuthContext)

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
          {!isAuthenticated ? (
            <li>
              <Link href="/login">
                <a>Entrar</a>
              </Link>
            </li>
          ) : (
            <li>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
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
          )}
        </ul>
      </Content>
    </Container>
  )
}
