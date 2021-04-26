import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../../styles/colors'

export const Container = styled.div`
  button {
    color: ${theme('mode', {
      light: colors.black,
      dark: colors.grayLighter
    })};
  }
  .MuiPaginationItem-page.Mui-selected {
    background: ${theme('mode', {
      light: colors.grayLight,
      dark: colors.grayDark
    })} !important;
    opacity: 0.5;
  }
`
