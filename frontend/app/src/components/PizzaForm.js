// src/components/PizzaForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PizzaForm.css';

function PizzaForm({ pizza, onPizzaUpdated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (pizza) {
      setName(pizza.name);
      setDescription(pizza.description);
      setPrice(pizza.price);
      setImageUrl(pizza.image_url);
    }
  }, [pizza]);

    // src/components/PizzaForm.js
    const handleSubmit = (e) => {
      e.preventDefault();

      if (pizza) {
        // Если редактируется пицца, выполняем PUT-запрос
        axios.put(`http://127.0.0.1:5000/pizzas/${pizza.id}`, {
          name: name,
          description: description,
          price: parseFloat(price),
          image_url: imageUrl,
        })
        .then(response => {
          console.log(response.data);
          if (onPizzaUpdated) onPizzaUpdated(); // Сбрасываем выбранную пиццу после обновления
        })
        .catch(error => console.error('Error updating pizza:', error));
      } else {
        // Если добавляется новая пицца, выполняем POST-запрос
        axios.post('http://127.0.0.1:5000/pizzas', {
          name: name,
          description: description,
          price: parseFloat(price),
          image_url: imageUrl,
        })
        .then(response => {
          console.log(response.data);
          setName('');
          setDescription('');
          setPrice('');
          setImageUrl('');
        })
        .catch(error => console.error('Error adding pizza:', error));
      }
    };


  return (
    <form className="pizza-form" onSubmit={handleSubmit}>
      <h2>{pizza ? 'Изменить Пиццу' : 'Добавить Пиццу'}</h2>
      <input
        type="text"
        placeholder="Название пиццы"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="URL изображения"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <button type="submit">{pizza ? 'Обновить Пиццу' : 'Добавить Пиццу'}</button>
    </form>
  );
}

export default PizzaForm;
