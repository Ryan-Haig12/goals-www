if(process.env.NODE_ENV === 'production') {
  module.exports = require('./vars/prod');
} else {
  console.log(process.env.NODE_ENV)
  module.exports = require('./vars/dev');
}