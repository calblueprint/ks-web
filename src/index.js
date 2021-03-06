import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store, persistor } from './lib/redux/store';

const AppConfigurations = [
  'REACT_APP_AIRTABLE_ENDPOINT_URL',
  'REACT_APP_AIRTABLE_BASE_ID',
  'REACT_APP_PAYPAL_CLIENT_ID',
  'REACT_APP_SERVER_URL',
  'REACT_APP_BUG_REPORT_URL'
];

// Fails explicitly if the environment is improperly configured
AppConfigurations.forEach(param => {
  if (!process.env[param]) {
    throw new Error(
      `Required configuration variable ${param} is ${process.env[param]}. Do you have a .env file and is it setup correctly?`
    );
  }
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
