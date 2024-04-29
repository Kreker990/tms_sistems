import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import './App.css';
import AuthModal from './components/AuthModal/AuthModal';
import { showNotification } from './redux/action';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      {
        true && <AuthModal />
      }
      {
        true && <div id="notification" className="notification">
          Сохранено успешно!
        </div>
      }
      <button onClick={()=>showNotification()}>jkjk</button>
    </div>
  );
}
