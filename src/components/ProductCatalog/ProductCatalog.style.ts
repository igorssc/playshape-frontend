import styled from 'styled-components'

export const Container = styled.div`
  padding: 3rem 0;
`

export const Content = styled.div`
  max-width: 1120px;
  margin: auto;

  > main {
    > div {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
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
`
