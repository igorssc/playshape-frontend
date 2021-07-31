import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import styled from 'styled-components'
import theme from 'styled-theming'
import Colors from '../../styles/Colors'

export const Container = styled.div`
  margin-bottom: 80px;
`

export const Content = styled.div`
  max-width: 1120px;
  margin: auto;

  * {
    color: ${theme('mode', {
      light: Colors.grayDarker,
      dark: Colors.grayLighter
    })} !important;
  }

  .details {
    display: flex;
    align-items: center;

    img {
      max-width: 50px;
      max-height: 50px;
      margin-right: 20px;
    }
  }

  .productQuantity {
    display: flex;
    align-items: center;
    line-height: 1rem;

    div {
      width: 50px;
      height: 3rem;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;

      &:first-child,
      &:last-child {
        border: 1px solid
          ${theme('mode', {
            light: Colors.grayLighter,
            dark: Colors.grayLight
          })};
        cursor: pointer;
        border-radius: 10rem;

        &:hover {
          background: ${theme('mode', {
            light: Colors.grayLighter,
            dark: 'transparent'
          })};
        }
      }
    }
  }
`

export const IconRemoveProduct = styled(RemoveCircleOutlineIcon)`
  cursor: pointer;
`
