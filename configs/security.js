const helmet = require('helmet');
const router = require('express').Router();

router.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'img-src': ["'self'", 'https://newsapi.org/'],
      'connect-src': ["'self'", 'https://newsapi.org/'],
    },
  }),
  helmet.referrerPolicy({
    policy: 'no-referrer',
  }),
  helmet.expectCt({
    maxAge: 86400,
  }),
  helmet.hsts(),
  helmet.noSniff(),
  helmet.dnsPrefetchControl(),
  helmet.ieNoOpen(),
  helmet.frameguard(),
  helmet.xssFilter(),
);
