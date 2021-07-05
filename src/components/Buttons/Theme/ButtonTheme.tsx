import { useTheme } from 'styled-components'
import { Switch } from '../../Switch/Switch'
import { Container } from './ButtonTheme.style'

interface ButtonThemeProps {
  handleTheme: () => void
}

export const ButtonTheme: React.FC<ButtonThemeProps> = props => {
  const theme = useTheme()

  const handleTheme = () => {
    props.handleTheme()
  }

  return (
    <Container>
      <Switch
        checked={(theme as { mode: string }).mode === 'dark'}
        handleChange={handleTheme}
      />
    </Container>
  )
}
