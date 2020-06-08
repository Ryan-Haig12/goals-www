import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { ApolloProvider } from '@apollo/react-hooks'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from './App'
import reducers from './redux/reducers/index'

// grabbing env var from package.json when running locally
// this isn't the best, I need to figure out how to run 'npm run build' in PROD to eliminate the need for this and set up env variables
const envUri = process.env.REACT_APP_ENV === 'local' ? 'http://localhost:4000/' : 'https://goals-graphql.herokuapp.com/'
const wsUri = process.env.REACT_APP_ENV === 'local' ? 'ws://localhost:4000/' : 'ws://goals-graphql.herokuapp.com/'

// subscription and ws uris
const httpLink = new HttpLink({uri: envUri})
const wsClient = new SubscriptionClient(wsUri)

const wsLink = new WebSocketLink(wsClient)
const subLink = split(({ query }) => {
  const { kind, operation } = getMainDefinition(query)
  return kind === 'OperationDefinition' && operation === 'subscription'
}, wsLink, httpLink)

// add the authorization to the headers
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${ localStorage.getItem('userJWT') || null }`
    }
  })
  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, subLink),
})

// Set up Redux and Redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers( applyMiddleware(thunk) ))

const userJWT = localStorage.getItem('userJWT')

const jsx = (
  <Provider store={ store }>
    <ApolloProvider client={ client }>
        <App userJWT={ userJWT } />
    </ApolloProvider>
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));