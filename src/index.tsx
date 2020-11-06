import React from 'react';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Roboto Font used by material ui
import 'fontsource-roboto';

ReactDOM.render(
  <React.StrictMode>
    <MuiPickersUtilsProvider utils={MomentUtils} locale="es">
      <App />
    </MuiPickersUtilsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
