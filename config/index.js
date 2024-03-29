const { json, urlencoded } = require('express');
const cors = require('cors');
const logger = require('morgan');
module.exports = (app) => {
    app.set('trust proxy', 1);
  
    const CLIENT_URL = process.env.ORIGIN || 'http://localhost:5173';
  
    app.use(cors({
      origin: [CLIENT_URL]
    }))
  
    app.use(logger('dev'));
  
    app.use(json()); // req.body
    app.use(urlencoded({extended: false}));
  };