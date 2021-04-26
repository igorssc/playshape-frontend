import styled from 'styled-components'

export const Container = styled.div`
  padding: 3rem 1rem;
`

export const Content = styled.div`
  max-width: 1120px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: auto;

  img {
    width: 90%;
    margin: auto;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    p {
      font-size: 1.1rem;
      line-height: 2rem;
      margin-top: 1.5rem;
      text-align: center;
    }
  }
`
