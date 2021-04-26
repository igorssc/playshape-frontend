import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/colors'

export const Container = styled.div`
  background: ${theme('mode', {
    light: colors.grayDarker,
    dark: colors.grayDarker
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
    margin-bottom: 1rem;
  }

  p {
    text-align: justify;
    color: ${theme('mode', {
      light: colors.white,
      dark: colors.grayLighter
    })};
    font-size: 0.7rem;
  }
`
