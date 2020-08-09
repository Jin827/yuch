require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { Model } = require('objection');
const cors = require('cors');
const knex = require('./database');
const routes = require('./routes');

// Bind all Models to a knex instance.
Model.knex(knex);

const app = express();

// CORS Config
const whitelist = [
  'https://yu-chung.com',
  'https://yu-chung.com/api/',
  'http://localhost:9080/',
];

const msg =
  'The CORS policy for this site does not allow access from the specified Origin.';

const corsOptions = {
  origin(origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(new Error(msg), originIsWhitelisted);
  },
  credentials: true,
};

// app.use(cors(corsOptions));
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'PATCH', 'DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//   } else {
//     res.header('Access-Control-Allow-Origin', 'https://yu-chung.com');
//   }

//   return next();
// });

app.use(logger('dev'));
// extract POST data from HTTP request
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// routes
app.use('/api', routes);

// production error handler (no stacktraces leaked to user)
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err,
      error: {},
    });
  });
}
// development error handler (will print stacktrace)
else {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message,
      error: err.stack,
    });
  });
}

module.exports = app;
