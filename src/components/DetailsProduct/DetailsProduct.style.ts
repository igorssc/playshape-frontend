import styled from 'styled-components'
import theme from 'styled-theming'
import colors from '../../styles/colors'

export const Container = styled.div``

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  > h1 {
    text-align: center;
    font-size: 1.5rem;
  }

  main {
    padding-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;

    > div {
      display: flex;
      align-items: center;
    }

    > div:nth-child(1) {
      justify-content: center;
    }

    > div:nth-child(2) {
      flex-direction: column;
      justify-content: space-around;

      > h2 {
        font-size: 0.9rem;

        > a {
          transition: all 0.2s;

          &:hover {
            color: ${theme('mode', {
              light: colors.yellowLight,
              dark: colors.grayLight
            })};
          }
        }
      }

      > p {
        font-size: 1rem;
      }

      form {
        display: flex;
        flex-direction: column;
        width: 350px;
        max-width: 90%;
        color: white;

        > div {
          margin-top: 1.5rem;
        }

        .MuiSelect-root {
          font-size: 0.8rem;
        }
      }

      .details {
        text-align: center;

        h3 {
          text-decoration: line-through;
          margin: 0.5rem auto;
        }

        h2 {
          margin: 0.5rem auto;
          font-weight: bold;
        }
      }

      > div:last-child {
        display: flex;
        flex-direction: column;

        button {
          padding: 0.4rem 4rem;
          border: 1px solid transparent;
          transition: all 0.2s;
        }

        button:first-child {
          background: ${theme('mode', {
            light: colors.grayDarker,
            dark: colors.grayDark
          })};

          color: ${theme('mode', {
            light: colors.grayLighter,
            dark: colors.grayLighter
          })};

          &:hover {
            filter: ${theme('mode', {
              light: 'brightness(1.3)',
              dark: 'brightness(0.9);'
            })};
          }
        }

        button:last-child {
          margin-top: 1rem;

          background: ${theme('mode', {
            light: colors.yellowLight,
            dark: colors.grayLight
          })};

          color: ${theme('mode', {
            light: colors.grayDarker,
            dark: colors.grayDarker
          })};

          &:hover {
            filter: brightness(0.9);
          }
        }
      }
    }
  }
`