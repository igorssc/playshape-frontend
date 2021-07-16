import styled from 'styled-components'
import theme from 'styled-theming'
import Colors from '../../styles/Colors'

export const Container = styled.div``

export const Content = styled.div`
  width: 100%;
  max-width: 1120px;

  form {
    width: 100%;

    > div,
    > fieldset {
      display: grid;
      border: none;

      > div {
        margin: 10px;

        label {
          display: block;
          margin-bottom: 0.5rem;
        }
      }
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
        dark: Colors.grayDark
      })};
    }
  }
`
