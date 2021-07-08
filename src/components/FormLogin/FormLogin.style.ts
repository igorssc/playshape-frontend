import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/Colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    margin-top: 40px;
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 5px;
    }

    input {
      margin-bottom: 10px;
      border: none;
      height: 2rem;
      width: 400px;
      background: ${theme('mode', {
        light: '#eee',
        dark: colors.grayDark
      })};
    }

    button {
      margin: 10px 0;
      width: 400px;
      padding: 10px;
      border: none;
      transition: all 0.2s;
      background: ${theme('mode', {
        light: colors.yellowLight,
        dark: colors.grayDark
      })};
      color: ${theme('mode', {
        light: colors.black,
        dark: colors.grayLighter
      })};

      &:hover {
        filter: brightness(0.9);
      }
    }

    button + button {
      background: #fff;
      box-shadow: 0px 4px 4px 0px #00000040;
      color: ${colors.grayDarker};

      img {
        width: 15px;
      }
    }
  }

  h3:last-child {
    margin-top: 1rem;
  }

  @media (max-width: 768px) {
    h2 {
      display: none;
    }

    margin-bottom: 50px;
  }
`
