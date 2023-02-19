import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
import { positions, transitions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"


const options={
timeout:4000,
position:positions.TOP_RIGHT,
transition:transitions.FADE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </Provider>
  </React.StrictMode>
);

