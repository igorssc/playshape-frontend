import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto 40px auto;

  h1 {
    margin: 1.5rem auto;
    font-size: 1.5rem;
  }

  > div {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 1120px) {
    margin: 0 40px 40px 40px;
  }

  @media (max-width: 768px) {
    h1 {
      text-align: center;
    }

    > div {
      flex-direction: column-reverse;
    }
  }
`
