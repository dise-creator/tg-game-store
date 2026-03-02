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
    tg?.expand(); // Это заставит окно открыться на весь экран
  }, []);

  const onAdd = (item) => {
    tg.MainButton.text = `Оплатить ${item.title}: ${item.price}₽`;
    tg.MainButton.show();
  };

  return (
    <div className="App" style={{ color: 'var(--tg-theme-text-color)', background: 'var(--tg-theme-bg-color)', minHeight: '100vh' }}>
      <header style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Привет, {tg?.initDataUnsafe?.user?.first_name || 'Геймер'}!</h2>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px' }}>
        {products.map(item => (
          <div key={item.id} style={{
            background: 'var(--tg-theme-secondary-bg-color)',
            padding: '15px',
            borderRadius: '15px',
            textAlign: 'center',
            border: '1px solid #444'
          }}>
            <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>{item.title}</h3>
            <b style={{ color: 'var(--tg-theme-button-color)' }}>{item.price} ₽</b>
            <button 
              onClick={() => onAdd(item)}
              style={{
                marginTop: '10px',
                width: '100%',
                padding: '12px',
                background: 'var(--tg-theme-button-color)',
                color: 'var(--tg-theme-button-text-color)',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              Купить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
