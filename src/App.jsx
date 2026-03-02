import { useEffect } from 'react';

const tg = window.Telegram?.WebApp;

const products = [
  {id: 1, title: 'Minecraft', price: 1500},
  {id: 2, title: 'GTA V', price: 2500},
  {id: 3, title: 'Elden Ring', price: 3999},
  {id: 4, title: 'Cyberpunk 2077', price: 2000},
];

// Стили прямо в коде
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    background: 'var(--tg-theme-bg-color, #ffffff)',
    color: 'var(--tg-theme-text-color, #000000)',
    minHeight: '100vh',
    fontFamily: 'sans-serif'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginTop: '20px'
  },
  card: {
    background: 'var(--tg-theme-secondary-bg-color, #f0f0f0)',
    padding: '15px',
    borderRadius: '15px',
    border: '1px solid rgba(0,0,0,0.1)'
  },
  button: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    border: 'none',
    borderRadius: '10px',
    background: 'var(--tg-theme-button-color, #248bcf)',
    color: 'var(--tg-theme-button-text-color, #ffffff)',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

function App() {
  useEffect(() => {
    tg?.ready();
    tg?.expand();
  }, []);

  const onAdd = (item) => {
    tg.MainButton.text = `Купить ${item.title} за ${item.price}₽`;
    tg.MainButton.show();
    tg.HapticFeedback.impactOccurred('medium');
  };

  return (
    <div style={styles.container}>
      <h2 style={{margin: '0 0 10px 0'}}>Привет, {tg?.initDataUnsafe?.user?.first_name || 'Геймер'}!</h2>
      <div style={styles.grid}>
        {products.map(item => (
          <div key={item.id} style={styles.card}>
            <div style={{fontWeight: 'bold', fontSize: '14px'}}>{item.title}</div>
            <div style={{margin: '5px 0', color: 'var(--tg-theme-button-color)'}}>{item.price} ₽</div>
            <button style={styles.button} onClick={() => onAdd(item)}>Купить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
