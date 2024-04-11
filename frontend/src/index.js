import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {HelmetProvider} from "react-helmet-async"
import {ChakraProvider} from "@chakra-ui/react"


import { Provider } from 'react-redux';
import store from "./utlis/store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <HelmetProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </HelmetProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

