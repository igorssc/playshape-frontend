import { Container, Content } from './SubscribeNewsletter.style'

export const SubscribeNewsletter = () => {
  return (
    <Container>
      <Content>
        <h1>Receba ofertas e descontos exclusivos</h1>
        <form action="#">
          <div>
            <input type="text" name="name" placeholder="Nome" />
            <input type="text" name="email" placeholder="Email" />
          </div>
          <button type="submit">Desejo receber notícias e ofertas</button>
        </form>
      </Content>
    </Container>
  )
}
