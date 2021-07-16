import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { parseCookies } from 'nookies'

const httpLink = new HttpLink({
  // uri: 'http://localhost:3333/graphql/'
  uri: 'https://playshape.herokuapp.com/graphql/'
})

const token = (ctx = undefined) => parseCookies(ctx)['playshape.token']

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${token(operation.getContext().nextContext)}`
    }
  }))
  return forward(operation)
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink])
})
