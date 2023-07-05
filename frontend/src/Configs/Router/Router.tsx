import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Homepage from "../../Pages/Homepage";
import Register from "../../Pages/Register";
import Login from "../../Pages/Login";
import CryptoPage from "../../Pages/CryptoPage";
import PortfolioPage from "../../Pages/PortfolioPage";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {path:'', element:<Homepage/>},
            {path:'register', element:<Register/>},
            {path:'login',element:<Login/>},
            {path:'crypto/:id', element: <CryptoPage/>},
            {path: 'portfolio', element: <PortfolioPage/>},
        ]
    }
])