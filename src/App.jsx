import { useEffect } from 'react';
import './App.css';

const tg = window.Telegram.WebApp;

const products = [
  {id: 1, title: 'Minecraft', price: 1500, image: 'https://via.placeholder.com/150/248bcf/ffffff?text=Minecraft'},
  {id: 2, title: 'GTA V', price: 2500, image: 'https://via.placeholder.com/150/248bcf/ffffff?text=GTA+V'},
  {id: 3, title: 'Elden Ring', price: 3999, image: 'https://via.placeholder.com/150/248bcf/ffffff?text=Elden+Ring'},
  {id: 4, title: 'Cyberpunk 2077', price: 2000, image: 'https://via.placeholder.com/150/248bcf/ffffff?text=Cyberpunk'},
];

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <header style={{padding: '15px', textAlign: 'center', borderBottom: '1px solid #ccc'}}>
        <strong>Привет, {tg.initDataUnsafe?.user?.first_name || 'Геймер'}!</strong>
      </header>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px'}}>
        {products.map(item => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.title} style={{width: '100%', borderRadius: '8px'}} />
            <h3 style={{fontSize: '14px', margin: '10px 0'}}>{item.title}</h3>
            <p className="product-price">{item.price} ₽</p>
            <button style={{width: '100%'}}>Купить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
