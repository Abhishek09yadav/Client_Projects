import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ShopContextProvider from '../Context/ShopContext.jsx';
import {HashRouter} from 'react-router-dom'; // Import HashRouter instead of BrowserRouter

createRoot(document.getElementById('root')).render(
    <ShopContextProvider>
        <StrictMode>
            <HashRouter> {/* Replace BrowserRouter with HashRouter */}
                <App/>
            </HashRouter>
        </StrictMode>
    </ShopContextProvider>
);