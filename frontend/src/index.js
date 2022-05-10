import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import store from './configureStore'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './configs/themeConfigs'
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react'
import { AbilityContext } from './rules/Can'
import ability from './rules/ability'


const { store, persistor } = configureStore()

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AbilityContext.Provider value={ability}>

            <App />
          </AbilityContext.Provider>

        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
