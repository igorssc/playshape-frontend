import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/Colors'

export const Container = styled.div`
  width: 100%;

  > div {
    width: 100%;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after,
  .MuiInput-underline.Mui-focused:before,
  .MuiInput-underline.Mui-focused:after,
  .MuiInput-underline.Mui-disabled:hover:before,
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 1px solid
      ${theme('mode', {
        light: colors.grayDarker,
        dark: colors.grayLighter
      })};
  }

  .MuiSelect-icon,
  .MuiSelect-icon.Mui-disabled,
  .MuiFormLabel-root,
  .MuiFormLabel-root.Mui-focused,
  .MuiInputBase-root,
  .MuiInputBase-root.Mui-disabled {
    color: ${theme('mode', {
      light: colors.grayDarker,
      dark: colors.grayLighter
    })};
  }
`
