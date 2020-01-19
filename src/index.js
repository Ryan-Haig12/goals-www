import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks';

import { graphqlEndpoint } from './graphql/envVars'

import App from './App'

// Set up Apollo client
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: graphqlEndpoint
})

const client = new ApolloClient({
  cache,
  link
})

const jsx = (
    <ApolloProvider client={ client }>
        <App />
    </ApolloProvider>
)

ReactDOM.render(jsx, document.getElementById('root'));