import Link from 'next/link'
import React from 'react'
import { Container } from './RegisterMessage.style'

export const RegisterMessage: React.FC = () => {
  return (
    <Container>
      <img
        src="./images/Fitness_Monochromatic.svg"
        alt="Fitness Monochromatic"
      />
      <h2>Já possui conta? Faça seu login</h2>
      <Link href="/login">
        <a>Fazer login</a>
      </Link>
    </Container>
  )
}
