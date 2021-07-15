import { Container } from './FormRegister.style'

export const FormRegister: React.FC = () => {
  return (
    <Container>
      <h2>Insira seus dados</h2>
      <form action="#">
        <label htmlFor="name">Nome</label>
        <input type="text" name="name" />
        <label htmlFor="cpf">CPF</label>
        <input type="text" name="cpf" />
        <label htmlFor="email">Email</label>
        <input type="text" name="email" />
        <label htmlFor="pass">Senha</label>
        <input type="text" name="pass" />
        <button>Entrar</button>
      </form>
      <h3>Sou loja</h3>
    </Container>
  )
}
