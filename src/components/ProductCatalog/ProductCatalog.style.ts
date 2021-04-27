import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 3rem 0;
`

export const Content = styled.div`
  max-width: 1120px;
  margin: auto;

  > main {
    > div {
      display: grid;
    }

    footer {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 1.5rem;
    }
  }

  > h1 {
    text-align: center;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    > main {
      > div {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }

  @media (max-width: 576px) {
    > main {
      > div {
        grid-template-columns: 1fr;
      }
    }
  }

  @media (min-width: 768px) {
    > main {
      > div {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`
