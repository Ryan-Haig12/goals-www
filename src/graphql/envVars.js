if(process.env.NODE_ENV === 'production') {
  module.exports = require('./vars/prod');
} else {
  module.exports = require('./vars/dev');
}