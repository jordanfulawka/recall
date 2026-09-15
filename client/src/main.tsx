import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Due from './components/Due';
import All from './components/All';
import Add from './components/Add';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='dashboard' element={<Dashboard />}>
            <Route path='due' element={<Due />} />
            <Route path='all' element={<All />} />
            <Route path='add' element={<Add />} />
          </Route>
        </Routes>
        {/* <App /> */}
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
