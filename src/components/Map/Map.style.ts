import RoomIcon from '@material-ui/icons/Room'
import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/Colors'

export const Icon = styled(RoomIcon)`
  color: ${theme('mode', {
    light: colors.yellowLight,
    dark: colors.grayDark
  })};
  position: relative;
  font-size: 3rem !important;
  left: -0.8rem;
  top: -1.4rem;
`
