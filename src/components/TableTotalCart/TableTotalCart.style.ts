import styled from 'styled-components'
import theme from 'styled-theming'
import Colors from '../../styles/Colors'

export const Container = styled.div``

export const Content = styled.div`
  * {
    font-size: 1.2rem !important;
    color: ${theme('mode', {
      light: Colors.grayDarker,
      dark: Colors.grayLighter
    })} !important;
  }
`
