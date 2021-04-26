import { Container, Content } from './Initial.message.style'

export const InitialMessage: React.FC = () => {
  return (
    <Container>
      <Content>
        <div>
          <img
            src="/images/undraw_fitness_tracker_3033.svg"
            alt="Fitness tracker"
          />
        </div>
        <div>
          <h1>Tudo a um clique de distância</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit
            amet libero ante. In rutrum leo eget ex iaculis iaculis. Sed non
            feugiat metus. Aliquam id nisl ut purus pharetra tincidunt. Donec
            non ante ac nisi volutpat vehicula.
          </p>
        </div>
      </Content>
    </Container>
  )
}
