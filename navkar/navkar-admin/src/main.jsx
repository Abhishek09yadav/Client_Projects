import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ShopContextProvider from '../Context/ShopContext.jsx'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <ShopContextProvider> <StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>

    </StrictMode></ShopContextProvider>
    ,
)
