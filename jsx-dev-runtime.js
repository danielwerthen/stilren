'use strict';

const { jsx } = require('./dist');

const base =
  process.env.NODE_ENV === 'production'
    ? require('base-react/cjs/react-jsx-dev-runtime.production.min.js')
    : (module.exports = require('base-react/cjs/react-jsx-dev-runtime.development.js'));

module.exports = {
  ...base,
  jsxDEV: jsx.bind(null, base.jsxDEV),
};
