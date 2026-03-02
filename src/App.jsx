import { useEffect } from 'react';
import './App.css';

const tg = window.Telegram?.WebApp;

const products = [
  {id: 1, title: 'Minecraft', price: 1500},
  {id: 2, title: 'GTA V', price: 2500},
  {id: 3, title: 'Elden Ring', price: 3999},
  {id: 4, title: 'Cyberpunk 2077', price: 2000},
];

function App() {
  useEffect(() => {
    tg?.ready();
    // Устанавливаем цвет хедера под тему ТГ
    tg.setHeaderColor('secondary_bg_color');
  }, []);

  const onAdd = (item) => {
    // 1. Текст на главной кнопке
    tg.MainButton.setText(`Оплатить ${item.title}: ${item.price}₽`);
    // 2. Показываем её
    tg.MainButton.show();
    // 3. Добавляем вибрацию при клике (Haptic)
    tg.HapticFeedback.impactOccurred('medium');
    
    // 4. Что будет при нажатии на Главную кнопку
    tg.onEvent('mainButtonClicked', () => {
        tg.sendData(JSON.stringify(item)); // Отправляем данные боту
        tg.close(); // Закрываем магазин
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Привет, {tg?.initDataUnsafe?.user?.first_name || 'Геймер'}!</h1>
      </header>

      <div className="list">
        {products.map(item => (
          <div key={item.id} className="item">
            <div className="title">{item.title}</div>
            <div className="price">{item.price} ₽</div>
            <button className="add-btn" onClick={() => onAdd(item)}>
              Купить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
