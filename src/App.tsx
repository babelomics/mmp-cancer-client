import React from 'react';
import { Provider } from 'react-redux';
import Router from './components/router';
import store from './store';
import './i18n';
import './utils/interceptor';
import GlobalPopup from './components/globalPopups';

const App = () => {
  return (
    <Provider store={store}>
      <GlobalPopup />
      <Router />
    </Provider>
  );
};

export default App;
