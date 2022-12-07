import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { IPFSContextProvider } from './components/createnfts/IPFSContextProvider';

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <IPFSContextProvider>
        <App />
      </IPFSContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
