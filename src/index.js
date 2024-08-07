import * as ReactDOMClient from 'react-dom/client';
import App from './routes/App';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from './routes/SearchPage';



ReactDOMClient.createRoot(document.getElementById('root')).render(
    <React.Fragment>
        <BrowserRouter basename='/'>
        <App/>
        </BrowserRouter>
    </React.Fragment>
)
