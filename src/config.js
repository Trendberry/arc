const merge = require('lodash/merge')

const browser = typeof window !== 'undefined'
const ip = process.env.IP || '0.0.0.0'
const port = process.env.PORT || 3000
const basename = `/${process.env.PUBLIC_PATH || ''}`.replace('//', '/')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    baseUrl: `http://${ip}:${port}${basename}`,
    apiUrl: 'http://localhost:3005',
    fbAppId: '',
    googleClientId: '',
    basename,
    browser,
    ip,
    port,
  },
  test: {},
  development: {},
  production: {
    ip: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 8080,
    baseUrl: 'https://trendberry.herokuapp.com',
    apiUrl: 'https://trendberry-api.herokuapp.com/api',
  },
}

module.exports = merge(config.all, config[config.all.env])
