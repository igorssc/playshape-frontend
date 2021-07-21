import { lighten } from 'polished'
import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/Colors'

export const Container = styled.div`
  background: ${theme('mode', {
    light: lighten(0.1, colors.yellowLight),
    dark: lighten(0.1, colors.grayDarker)
  })};
`

export const Content = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 50px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ul {
    display: flex;

    li {
      height: 50px;
      list-style: none;
      padding: 0 0.4rem;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      line-height: 50px;

      button {
        height: 50px;
      }

      &:hover {
        border-color: ${theme('mode', {
          light: colors.grayDark,
          dark: colors.grayLight
        })};
      }
    }
  }

  @media (max-width: 962px) {
    padding: 0 2rem;
  }
`
