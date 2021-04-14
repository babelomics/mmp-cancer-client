import React from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Roboto Font used by material ui
import 'fontsource-roboto';
import AppTheme from './theme';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={MomentUtils} locale="es">
      <ThemeProvider theme={AppTheme}>
        <App />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
