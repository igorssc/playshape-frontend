import Alert from '@material-ui/lab/Alert'
import { signIn as signInFromGoogle } from 'next-auth/client'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/UseAuth'
import { useBackdrop } from '../../hooks/UseBackdrop'
import { Container } from './FormLogin.style'

export const FormLogin: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const { signIn } = useAuth()

  const { handleOpen: handleOpenBackdrop, handleClose: handleCloseBackdrop } =
    useBackdrop()

  async function handleSignIn(data: { email: string; password: string }) {
    try {
      handleOpenBackdrop()
      await signIn(data)
    } catch (error) {
      document.getElementById('alert').style.display = 'flex'
      document.getElementById('alert-message').innerHTML = error.message
    }
    handleCloseBackdrop()
  }

  return (
    <Container>
      <h2>Já sou cliente</h2>
      <Alert severity="error" id="alert">
        <span id="alert-message"></span>
      </Alert>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <label htmlFor="email">Email</label>
        <input {...register('email')} type="text" name="email" required />
        <label htmlFor="password">Senha</label>
        <input
          {...register('password')}
          type="password"
          name="password"
          required
        />
        <h3>Esqueceu a senha?</h3>
        <button type="submit">Entrar</button>
      </form>
      <button onClick={() => signInFromGoogle('google')}>
        <img src="./images/1200px-Google__G__Logo.png" alt="Logo Google" />{' '}
        &nbsp; Entrar com o Google
      </button>
      <h3>Área de loja</h3>
    </Container>
  )
}
