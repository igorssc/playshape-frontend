import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/Colors'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 1.2rem;
    margin: 1rem auto;
  }

  button {
    width: 300px;
    padding: 10px;
    border-radius: 0;
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
      filter: brightness(0.95);
    }
  }

  @media (max-width: 768px) {
    img {
      max-width: 100%;
    }
  }
`
