import Link from 'next/link'
import React from 'react'
import { Container } from './LoginMessage.style'

export const LoginMessage: React.FC = () => {
  return (
    <Container>
      <img
        src="./images/Fitness_Monochromatic.svg"
        alt="Fitness Monochromatic"
      />
      <h2>Novo por aqui? Crie sua conta</h2>
      <Link href="/register">
        <a>Criar conta</a>
      </Link>
    </Container>
  )
}
