/* eslint-disable global-require */
export default (
  process.env.BROWSER ?
    require('./ClientService') :
    require('./ServerService')
).default;
