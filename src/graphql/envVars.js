module.exports = {
    //graphqlEndpoint: process.env.GRAPHQL_ENDPOINT || 'http://localhost:4000' || 'https://goals-graphql.herokuapp.com/'
    graphqlEndpoint: process.env.DEV_ENV === 'true' ? process.env.GRAPHQL_ENDPOINT : 'http://localhost:4000',
    graphqlWebservice: process.env.GRAPQL_WS || 'ws://localhost:4000/',
}