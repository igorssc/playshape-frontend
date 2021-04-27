import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/colors'

type ContainerType = {
  visible: boolean
}

export const Container = styled.div<ContainerType>`
  position: fixed;
  right: 40px;
  bottom: 40px;
  background: ${theme('mode', {
    light: colors.grayDark,
    dark: colors.grayLight
  })};
  color: ${theme('mode', {
    light: colors.yellowLight,
    dark: colors.grayDarker
  })};
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  transition: all 0.2s;
  opacity: ${props => (props.visible ? 1 : 0)};

  &:hover {
    filter: brightness(0.8);
  }
`
