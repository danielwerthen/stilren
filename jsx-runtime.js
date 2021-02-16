'use strict';

const { jsx } = require('./dist');

const base =
  process.env.NODE_ENV === 'production'
    ? require('base-react/cjs/react-jsx-runtime.production.min.js')
    : (module.exports = require('base-react/cjs/react-jsx-runtime.development.js'));

module.exports = {
  ...base,
  jsx: jsx.bind(null, base.jsx),
  jsxs: jsx.bind(null, base.jsxs),
};
