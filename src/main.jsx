import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { DriverLogin, DriverRegister, Home, Login, Register, SetInfo } from './Pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={App}>
      <Route path="/" Component={Home} />
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route path="/driver/login" Component={DriverLogin} />
      <Route path="/driver/register" Component={DriverRegister} />
      <Route path='/set-info/:userType' Component={SetInfo} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
