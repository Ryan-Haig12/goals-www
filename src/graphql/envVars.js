// if(process.env.NODE_ENV === 'production') {
//   module.exports = require('./vars/prod');
// } else {
//   console.log(process.env.NODE_ENV)
//   module.exports = require('./vars/dev');
// }

module.exports = {
  graphqlWebservice: process.env.GRAPQL_WS || 'ws://localhost:4000/',
  graphqlEndpoint: process.env.GRAPHQL_ENDPOINT || 'http://localhost:4000/'
}