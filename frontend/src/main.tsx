import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './Configs/Redux/store.ts';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from './Configs/Router/Router.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
