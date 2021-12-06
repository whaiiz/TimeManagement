import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import allReducer from './reducers/index';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(allReducer, 
  //Extensão redux
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
