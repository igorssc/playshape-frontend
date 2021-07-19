import Alert from '@material-ui/lab/Alert'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/UseAuth'
import { Container } from './FormRegister.style'

export const FormRegister: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const { register: registerUser } = useAuth()

  async function handleSignIn({ name, email, password, confirmPassword }) {
    try {
      if (name.split(' ').length < 2) {
        throw new Error('Insira seu nome completo')
      }
      if (password.length < 8) {
        throw new Error('A senha deve conter mais de 8 caracteres')
      }
      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem')
      }

      await registerUser({ name, email, password })
    } catch (error) {
      document.getElementById('alert').style.display = 'flex'
      document.getElementById('alert-message').innerHTML = error.message
    }
  }

  return (
    <Container>
      <h2>Insira seus dados</h2>
      <Alert severity="error" id="alert">
        <span id="alert-message"></span>
      </Alert>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <label htmlFor="name">Nome</label>
        <input {...register('name')} type="text" name="name" required />
        <label htmlFor="email">Email</label>
        <input {...register('email')} type="text" name="email" required />
        <label htmlFor="password">Senha</label>
        <input
          {...register('password')}
          type="password"
          name="password"
          required
        />
        <label htmlFor="confirmPassword">Digite novamente a senha</label>
        <input
          {...register('confirmPassword')}
          type="password"
          name="confirmPassword"
          required
        />
        <button>Registrar</button>
      </form>
      <h3>Sou loja</h3>
    </Container>
  )
}
