
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./stilren.cjs.production.min.js')
} else {
  module.exports = require('./stilren.cjs.development.js')
}
