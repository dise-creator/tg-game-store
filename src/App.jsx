import { useEffect } from 'react';

const tg = window.Telegram?.WebApp;

const products = [
  {id: 1, title: 'Minecraft', price: 1500, img: 'https://i.ibb.co/pW3mXGv/minecraft.jpg'},
  {id: 2, title: 'GTA V', price: 2500, img: 'https://i.ibb.co/mS6vPZ8/gta5.jpg'},
  {id: 3, title: 'Elden Ring', price: 3999, img: 'https://i.ibb.co/Xz9tG9S/elden-ring.jpg'},
  {id: 4, title: 'Cyberpunk 2077', price: 2000, img: 'https://i.ibb.co/hR4yP6V/cyberpunk.jpg'},
];

function App() {
  useEffect(() => {
    tg?.ready();
    tg?.expand();
  }, []);

  const onAdd = (item) => {
    tg.MainButton.text = `Купить ${item.title} за ${item.price}₽`;
    tg.MainButton.show();
    tg.HapticFeedback.impactOccurred('medium');
    tg.onEvent('mainButtonClicked', () => {
        tg.sendData(JSON.stringify(item));
    });
  };

  const s = {
    container: { padding: '20px', textAlign: 'center', background: 'var(--tg-theme-bg-color)', color: 'var(--tg-theme-text-color)', minHeight: '100vh' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' },
    card: { background: 'var(--tg-theme-secondary-bg-color)', padding: '10px', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden' },
    img: { width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' },
    btn: { width: '100%', padding: '10px', marginTop: '10px', border: 'none', borderRadius: '10px', background: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)', fontWeight: 'bold' }
  };

  return (
    <div style={s.container}>
      <h2>Привет, {tg?.initDataUnsafe?.user?.first_name || 'Геймер'}!</h2>
      <div style={s.grid}>
        {products.map(item => (
          <div key={item.id} style={s.card}>
            <img src={item.img} alt={item.title} style={s.img} />
            <b style={{fontSize: '14px'}}>{item.title}</b>
            <div style={{margin: '5px 0', color: 'var(--tg-theme-link-color)', fontWeight: 'bold'}}>{item.price} ₽</div>
            <button style={s.btn} onClick={() => onAdd(item)}>Купить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
