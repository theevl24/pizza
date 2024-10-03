// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PizzaList from './components/PizzaList';
import Admin from './components/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/"><h1>Главная</h1></Link>
          <Link to="/admin"><h1>Админ-панель</h1></Link>
        </nav>
        <Routes>
          <Route path="/" element={<PizzaList />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
