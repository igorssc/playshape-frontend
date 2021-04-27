import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/colors'

export const Container = styled.div`
  padding: 2rem 0;
`

export const Content = styled.div`
  max-width: 1120px;
  padding-bottom: 4rem;

  > div > h1 {
    margin-bottom: 2rem;
  }

  main {
    display: grid;

    > div:nth-child(1) {
      border: 2px solid
        ${theme('mode', {
          light: colors.grayLight,
          dark: colors.grayDark
        })};
      border-radius: 100%;
      overflow: hidden;

      img {
        object-fit: cover;
        object-position: center;
      }

      > ul:first-child {
        & > li {
          list-style: none;
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

  @media (max-width: 1120px) {
    margin: 0 2rem;

    > div > h1 {
      font-size: 1.2rem;
    }

    main {
      grid-template-columns: 1fr;

      > div + div {
        margin-top: 2rem;
      }

      div:nth-child(1) {
        width: 100px;
        height: 100px;

        img {
          width: 100px;
          height: 100px;
        }
      }
    }
  }

  @media (min-width: 1120px) {
    margin: 0 auto;

    > div > h1 {
      font-size: 1.5rem;
    }

    main {
      grid-template-columns: repeat(2, 1fr);

      div:nth-child(1) {
        width: 200px;
        height: 200px;

        img {
          width: 200px;
          height: 200px;
        }
      }
    }
  }
`
