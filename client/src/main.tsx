import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
        {/* <App /> */}
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
