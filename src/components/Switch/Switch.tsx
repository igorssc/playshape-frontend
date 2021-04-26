import React from 'react'
import { Container } from './Switch.style'

export const Switch = ({ checked, handleChange }) => {
  return (
    <Container
      checked={checked}
      color="default"
      onChange={handleChange}
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  )
}
