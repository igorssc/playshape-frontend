import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/colors'

export const Container = styled.div`
  background: ${theme('mode', {
    light: colors.yellowLight,
    dark: colors.grayDark
  })};
`
export const Content = styled.div`
  max-width: 1120px;
  margin: auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }

  form {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        padding: 0.5rem;
        border: none;
        outline-color: ${colors.grayLight};
      }
    }

    button {
      background: ${theme('mode', {
        light: colors.grayDarker,
        dark: colors.grayDarker
      })};
      color: ${theme('mode', {
        light: colors.white,
        dark: colors.grayLighter
      })};
      border: none;
      padding: 0.7rem;
      width: 420px;
      max-width: 90%;
      margin-top: 2rem;

      &:hover {
        filter: ${theme('mode', {
          light: 'brightness(2)',
          dark: 'brightness(0.8)'
        })};
      }
    }
  }

  @media (max-width: 576px) {
    form {
      > div {
        input {
          width: 90%;
        }

        input + input {
          margin-top: 1rem;
        }

        flex-direction: column;
      }
    }
  }

  @media (min-width: 576px) {
    form {
      > div {
        input {
          width: 420px;
          max-width: calc((90% / 2) - 0.25rem);
        }

        input + input {
          margin-left: 1.5rem;
        }
      }
    }
  }
`
