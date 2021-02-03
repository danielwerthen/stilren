
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./tsdx.cjs.production.min.js')
} else {
  module.exports = require('./tsdx.cjs.development.js')
}
