import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'


import './Style.scss'
// const resul = require('dotenv').config()

console.log(process.env)
// const {DB_HOST, DB_PORT, DB_USER, DB_PASS} = process.env
// const db = require()

// db.connect({
// host: DB_HOST,
// port: DB_PORT,
// user: DB_USER,
// pass: DB_PASS
// })

ReactDOM.render(
    <App/>,
  document.getElementById('root')
);
