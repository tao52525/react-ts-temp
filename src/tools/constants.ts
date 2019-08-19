const ENV = process.env.APP_ENV

let domain = ''
if (ENV === 'local') {
  domain = `localhost:9000`
} else if (ENV === 'dev') {
  domain = 'http:dev'
} else if (ENV === 'uat') {
  domain = 'http:uat'
} else if (ENV === 'prod') {
  domain = 'http:prod'
}

export default {
  domain,
  LOGIN: '/login'
}
