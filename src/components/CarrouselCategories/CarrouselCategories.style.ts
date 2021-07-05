import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/colors'

export const SampleArrow = styled.div`
  display: 'block';
  filter: ${theme('mode', {
    light: 'invert(1)',
    dark: 'invert(0)'
  })};
`

export const Container = styled.div`
  transition: all 0.2s;
  margin: 0 auto 3rem auto;
  padding: 0 1.7rem;
  max-width: 1120px;
`

export const Content = styled.div`
  max-width: 1120px;
`

export const Ball = styled.div`
  > div {
    background: ${theme('mode', {
      light: colors.yellowLight,
      dark: colors.grayDark
    })};
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: auto;
    justify-content: center;
    text-align: center;

    &:hover {
      filter: brightness(0.9);
    }
  }
`
