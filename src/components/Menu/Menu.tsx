import Link from 'next/link'
import { ButtonTheme } from '../Buttons/Theme/ButtonTheme'
import { Container, Content } from './Menu.style'

interface MenuProps {
  handleTheme: () => void
}

export const Menu: React.FC<MenuProps> = props => {
  return (
    <Container>
      <Content>
        <ul>
          <ButtonTheme handleTheme={props.handleTheme} />
        </ul>
        <ul>
          <li>
            <Link href="./login">
              <a>Entrar</a>
            </Link>
          </li>
        </ul>
      </Content>
    </Container>
  )
}
