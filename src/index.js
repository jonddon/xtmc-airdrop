import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChainId, DAppProvider } from '@usedapp/core'


const config = {

}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

