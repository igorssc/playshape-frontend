import styled from 'styled-components'
import theme from 'styled-theming'
import Colors from '../Colors'

export const Container = styled.div``

export const Content = styled.div`
  max-width: 1120px;
  margin: auto;

  > h1 {
    font-size: 1.5rem;
    line-height: 3.5rem;
    margin: 2rem auto;
  }

  #detailsTotal {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 50px;

    & :last-child {
      padding: 0 20px;

      button {
        padding: 10px 80px;
        display: block;
        margin: 20px 0 0 auto;
        transition: all 0.2s;
        border: none;

        background: ${theme('mode', {
          light: Colors.grayDarker,
          dark: Colors.grayDark
        })};

        color: ${theme('mode', {
          light: Colors.grayLighter,
          dark: Colors.grayLighter
        })};

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
`
