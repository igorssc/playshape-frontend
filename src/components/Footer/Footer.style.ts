import { lighten } from 'polished'
import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/Colors'

export const Container = styled.div`
  background: ${theme('mode', {
    light: colors.grayDarker,
    dark: lighten(0.02, colors.grayDarker)
  })};
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    margin: 0 auto 1rem auto;
    max-width: 90%;
  }

  p {
    text-align: justify;
    color: ${theme('mode', {
      light: colors.white,
      dark: colors.grayLighter
    })};
    font-size: 0.7rem;
  }

  @media (max-width: 1120px) {
    p {
      margin: auto 1.5rem;
    }
  }

  @media (min-width: 1120px) {
    p {
      margin: auto;
    }
  }
`
