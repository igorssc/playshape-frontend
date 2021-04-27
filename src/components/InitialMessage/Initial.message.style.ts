import styled from 'styled-components'

export const Container = styled.div`
  padding: 3rem 1rem;
`

export const Content = styled.div`
  max-width: 1120px;
  display: grid;

  margin: auto;

  img {
    margin: auto;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
      text-align: center;
    }

    p {
      font-size: 1.1rem;
      line-height: 2rem;
      margin-top: 1.5rem;
      text-align: center;
    }
  }

  @media (max-width: 920px) {
    grid-template-columns: 1fr;

    img {
      width: 500px;
      max-width: 80%;
    }

    h1 {
      margin-top: 2rem;
    }
  }

  @media (min-width: 920px) {
    grid-template-columns: repeat(2, 1fr);

    img {
      width: 90%;
    }

    h1 {
      margin-top: 2rem;
    }
  }
`
