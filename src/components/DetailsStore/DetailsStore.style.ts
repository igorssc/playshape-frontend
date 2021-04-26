import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/colors'

export const Container = styled.div`
  padding: 2rem 0;
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding-bottom: 4rem;

  > div > h1 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  main {
    display: grid;
    grid-template-columns: 1fr 1fr;

    > div:nth-child(1) {
      border: 2px solid
        ${theme('mode', {
          light: colors.grayLight,
          dark: colors.grayDark
        })};
      width: 200px;
      height: 200px;
      border-radius: 100%;
      overflow: hidden;

      img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        object-position: center;
      }

      > ul:first-child {
        & > li {
          list-style: none;
          /* text-align: center; */
        }
      }
    }

    > div:nth-child(2) {
      ul > li {
        list-style: none;

        & + li {
          margin: 1rem auto;
        }

        > p {
          margin: 0.5rem auto;
        }
      }
    }
  }
`
