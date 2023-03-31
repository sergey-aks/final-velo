import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { legacy_createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducer } from "./components/storage/combineReducer"

export const store = legacy_createStore( combineReducer, composeWithDevTools(applyMiddleware(thunk)) );

axios.defaults.baseURL = "https://sf-final-project-be.herokuapp.com/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

