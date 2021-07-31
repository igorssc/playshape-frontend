import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/Colors'

export const Container = styled.div``

export const Content = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 15px auto;

  form {
    width: 100%;

    h2 {
      font-size: 1.2rem;
      margin: 30px 0 30px 10px;
    }

    > button {
      margin: 40px 0 1rem 10px;
      background: ${theme('mode', {
        light: colors.grayDarker,
        dark: colors.grayDark
      })};
      color: ${theme('mode', {
        light: colors.white,
        dark: colors.grayLighter
      })};
      transition: all 0.2s;
      padding: 0.7rem;
      width: 300px;
      max-width: 90%;
      cursor: pointer;
      border: none;

      &:hover {
        filter: ${theme('mode', {
          light: 'brightness(1.5)',
          dark: 'brightness(0.8)'
        })};
      }
    }

    button + button {
      margin-left: 2rem;
    }

    > div,
    > fieldset {
      display: grid;
      border: none;

      p.remove-address {
        margin-left: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
      }

      > div {
        margin: 10px;

        label {
          display: block;
          margin-bottom: 0.5rem;
        }
      }
    }

    p.add-address {
      margin-top: 15px;
      margin-left: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    > div:nth-child(1) {
      grid-template-columns: repeat(2, 1fr);
    }

    > fieldset.address {
      grid-template-columns: repeat(3, 1fr);
    }

    input,
    select {
      width: 100%;
      margin-left: 0;
      padding-left: 10px;
      border: none;
      height: 2rem;
      background: ${theme('mode', {
        light: '#eee',
        dark: colors.grayDark
      })};
      color: ${theme('mode', {
        light: colors.grayDarker,
        dark: colors.grayLighter
      })};
    }
  }

  @media (max-width: 768px) {
    form {
      > fieldset.address {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  @media (max-width: 576px) {
    form {
      h2 {
        margin-left: 30px;
      }

      > div:nth-child(1) {
        grid-template-columns: 1fr;
      }

      > fieldset.address {
        grid-template-columns: 1fr;
      }

      > button {
        display: block;
        margin: 40px auto 1rem auto;
      }

      > div,
      > fieldset {
        margin: 20px;
      }
    }

    p.remove-address {
      margin-left: 30px;
    }

    p.add-address {
      margin-left: 30px !important;
    }
  }
`
