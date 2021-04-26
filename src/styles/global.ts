import { createGlobalStyle } from 'styled-components'
import theme from 'styled-theming'
import colors from './colors'

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media (max-width: 1080px) {
  html {
    font-size: 93.75%;
  }
}

@media (max-width: 720px) {
  html {
    font-size: 87.5%;
  }
}

body {
  background: ${theme('mode', {
    light: colors.white,
    dark: colors.grayDarker
  })};
  color: ${theme('mode', {
    light: colors.black,
    dark: colors.grayLighter
  })};
  transition: all 0.2s;
}

body,
input,
textarea,
select,
button {
  font: 300 1rem 'Roboto', sans-serif;
}

h1, h2, h3, h4, h5, h6, p{
  font-weight: 300;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

`
