import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache
} from '@apollo/client'

const httpLink = new HttpLink({
  // uri: 'http://localhost:3333/graphql/'
  uri: 'https://playshape.herokuapp.com/graphql/'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization:
        typeof window !== 'undefined'
          ? localStorage.getItem('token') || null
          : null
    }
  }))

  return forward(operation)
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink])
})
