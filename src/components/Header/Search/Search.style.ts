import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../../styles/colors'

export const Container = styled.div`
  form {
    position: relative;
    color: ${colors.grayDark};
    display: grid;
    grid-template-columns: 4fr 1fr;
    gap: 1rem;

    input {
      border: none;
      padding: 10px 10px 10px 45px;
      outline-color: ${colors.grayLight};
      border-radius: 3px;
      width: 100%;
    }

    button {
      background: ${colors.grayDarker};
      border: none;
      padding: 10px 30px;
      color: ${colors.white};
      border-radius: 3px;
      transition: 0.2s;

      &:hover {
        filter: ${theme('mode', {
          light: 'brightness(2)',
          dark: 'brightness(0.8)'
        })};
      }
    }

    span {
      position: absolute;
      top: 12px;
      left: 15px;
    }
  }
`
