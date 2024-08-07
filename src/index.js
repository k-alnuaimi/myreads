import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import React from 'react';

ReactDOMClient.createRoot(document.getElementById('root')).render(
    <React.Fragment>
        <App/>
    </React.Fragment>
)
