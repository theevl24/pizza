// src/components/PizzaList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PizzaList.css';

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/pizzas')
      .then(response => setPizzas(response.data))
      .catch(error => console.error('Error fetching pizzas:', error));
  }, []);

  return (
    <div className="pizza-list">
      <h1>Меню</h1>
      <div className="pizza-cards">
        {pizzas.map(pizza => (
          <div key={pizza.id} className="pizza-card">
            <div className="pizza-left">
              {pizza.image_url && <img src={pizza.image_url} alt={pizza.name} className="pizza-image" />}
              <h3>{pizza.name}</h3>
              <p className="pizza-price">Цена: ${pizza.price.toFixed(2)}</p>
            </div>
            <div className="pizza-right">
              <p className="pizza-description">{pizza.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PizzaList;
