import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/Colors'

export const Container = styled.header`
  background: ${theme('mode', {
    light: colors.yellowLight,
    dark: colors.grayDark
  })};
`

export const Content = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;

  h1 {
    font-size: 2rem;
    letter-spacing: 0.1rem;
  }

  h2 {
    font-size: 1.2rem;
    margin-top: 15px;
    margin-bottom: 30px;
  }

  img {
    width: 12rem;
    margin-bottom: 30px;
    cursor: pointer;
  }

  @media (max-width: 576px) {
    padding: 40px 2rem;

    h1 {
      text-align: center;
    }

    h2 {
      text-align: center;
    }
  }
`
