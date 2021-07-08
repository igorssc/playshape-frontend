import { Container } from './FormLogin.style'

export const FormLogin: React.FC = () => {
  return (
    <Container>
      <h2>Já sou cliente</h2>
      <form action="#">
        <label htmlFor="cpf">Email</label>
        <input type="text" name="email" />
        <label htmlFor="pass">Senha</label>
        <input type="text" name="pass" />
        <h3>Esqueceu a senha?</h3>
        <button>Entrar</button>
        <button>
          <img src="./images/1200px-Google__G__Logo.png" alt="Logo Google" />{' '}
          &nbsp; Entrar com o Google
        </button>
      </form>
      <h3>Área de loja</h3>
    </Container>
  )
}
