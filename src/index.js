import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store/index'
import './css/index.css';

import * as serviceWorker from './serviceWorker';
import App from './router'

import { persistor } from './store/index'
import { PersistGate } from 'redux-persist/lib/integration/react';

ReactDOM.render(
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ persistor }>
        <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
