import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/colors'

export const Container = styled.div``

export const Content = styled.div`
  margin: auto;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;

  > img {
    margin-top: 2rem;
    max-width: 80%;
  }

  h1 {
    font-size: 1rem;
    font-weight: 500;
    margin-top: 1rem;
  }

  h2 {
    font-size: 0.8rem;
    margin-top: 1rem;

    a {
      font-weight: bold;
    }
  }

  h2 + h2 {
    margin-bottom: 1rem;
  }

  h3 {
    margin-top: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme('mode', {
      light: colors.yellowLight,
      dark: colors.grayLighter
    })};
    transition: 0.2s;
  }

  h4 {
    text-decoration: line-through;
  }

  p {
    margin-top: 1rem;
    font-size: 0.9rem;
    line-height: 1.2rem;
  }

  > a {
    margin-top: 1rem;
    background: ${theme('mode', {
      light: colors.grayDarker,
      dark: colors.grayDark
    })};
    color: ${theme('mode', {
      light: colors.white,
      dark: colors.grayLighter
    })};
    transition: 0.2s;
    padding: 0.7rem;
    width: 80%;
    cursor: pointer;

    &:hover {
      filter: ${theme('mode', {
        light: 'brightness(2)',
        dark: 'brightness(0.8)'
      })};
    }
  }
`
