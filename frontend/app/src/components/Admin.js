// src/components/Admin.js
import React, { useState, useEffect } from 'react';
import PizzaForm from './PizzaForm';
import axios from 'axios';
import './Admin.css';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('add'); // 'add' для добавления, 'edit' для изменения
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  const handleLogin = () => {
    // Простая проверка пароля
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Неверный пароль!');
    }
  };

  useEffect(() => {
    // Получаем список пицц
    axios.get('http://127.0.0.1:5000/pizzas')
      .then(response => setPizzas(response.data))
      .catch(error => console.error('Error fetching pizzas:', error));
  }, []);

  const handleEdit = (pizza) => {
    setSelectedPizza(pizza);
    setActiveTab('edit');
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h2>Вход в админ-панель</h2>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Войти</button>
        </div>
      ) : (
        <div>
          <h2>Добро пожаловать, Админ!</h2>

          {/* Переключение вкладок */}
          <div className="admin-tabs">
            <button onClick={() => setActiveTab('add')} className={activeTab === 'add' ? 'active' : ''}>Добавить Пиццу</button>
            <button onClick={() => setActiveTab('edit')} className={activeTab === 'edit' ? 'active' : ''}>Изменить Пиццу</button>
          </div>

          {/* Вкладка для добавления пиццы */}
          {activeTab === 'add' && (
            <PizzaForm />
          )}

          {/* Вкладка для изменения пиццы */}
          {activeTab === 'edit' && (
            <div>
              {selectedPizza ? (
                <PizzaForm pizza={selectedPizza} onPizzaUpdated={() => setSelectedPizza(null)} />
              ) : (
                <div>
                  <h3>Список пицц</h3>
                  <ul>
                    {pizzas.map(pizza => (
                      <li key={pizza.id}>
                        {pizza.name} - ${pizza.price.toFixed(2)}
                        <button onClick={() => handleEdit(pizza)}>Изменить</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;
