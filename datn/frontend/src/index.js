import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "../node_modules/mdb-react-ui-kit/dist/css/mdb.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from 'react-redux';
import store from './store/index'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
