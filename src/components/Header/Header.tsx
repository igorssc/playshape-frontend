import Link from 'next/link'
import { Container, Content } from './Header.style'
import { Search } from './Search/Search'

export const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <Link href="/">
          <img src="/images/PlayShape_v1.png" alt="Logo PlayShape" />
        </Link>
        <h1>Suplementação a um clique de distância</h1>
        <h2>Descubra lojas de suprimentos perto de você</h2>
        <Search />
      </Content>
    </Container>
  )
}
