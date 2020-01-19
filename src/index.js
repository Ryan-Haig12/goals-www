import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { graphqlEndpoint } from './graphql/envVars'

import App from './App'
import reducers from './redux/reducers/index'

// Set up Apollo client
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: graphqlEndpoint
})
const client = new ApolloClient({
  cache,
  link
})

// Set up Redux and Redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers( applyMiddleware(thunk) ))

const jsx = (
  <Provider store={ store }>
    <ApolloProvider client={ client }>
        <App />
    </ApolloProvider>
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));