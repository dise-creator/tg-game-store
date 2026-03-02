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
  }, []);

  const onAdd = (item) => {
    // Показываем главную кнопку ТГ при нажатии на товар
    tg.MainButton.text = `Купить ${item.title} за ${item.price}₽`;
    tg.MainButton.show();
  };

  return (
    <div className="App">
      <header style={{textAlign: 'center', padding: '10px'}}>
        <strong>Привет, {tg?.initDataUnsafe?.user?.first_name || 'Геймер'}!</strong>
      </header>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '10px'}}>
        {products.map(item => (
          <div key={item.id} style={{border: '1px solid #eee', padding: '15px', borderRadius: '15px', textAlign: 'center'}}>
            <h3 style={{fontSize: '14px'}}>{item.title}</h3>
            <p style={{color: '#248bcf', fontWeight: 'bold'}}>{item.price} ₽</p>
            <button 
  onClick={() => onAdd(item)}
  style={{
    width: '100%', 
    background: 'var(--tg-theme-button-color, #248bcf)', 
    color: 'var(--tg-theme-button-text-color, #ffffff)', 
    border: 'none', 
    borderRadius: '8px', 
    padding: '10px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }}
>
  Выбрать
</button>gi
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
