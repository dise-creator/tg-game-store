import { useEffect } from 'react';

const tg = window.Telegram?.WebApp;

const products = [
  {id: 1, title: 'Minecraft', price: 1500, img: '/mc.jpg'},
  {id: 2, title: 'GTA V', price: 2500, img: '/gta.jpg'},
  {id: 3, title: 'Elden Ring', price: 3999, img: '/elden.jpg'},
  {id: 4, title: 'Cyberpunk 2077', price: 2000, img: '/cyber.jpg'}
];

function App() {
  useEffect(() => {
    tg?.ready();
    tg?.expand();
  }, []);

  const onAdd = (item) => {
    tg.MainButton.setText(`Купить ${item.title} за ${item.price}₽`);
    tg.MainButton.show();
  };

  // Тот самый объект стилей со стильным бэкграундом
  const s = {
    container: { 
      padding: '20px', 
      textAlign: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', 
      color: 'white',
      fontFamily: 'sans-serif'
    },
    grid: { 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gap: '15px', 
      marginTop: '20px' 
    },
    card: { 
      background: 'rgba(255, 255, 255, 0.05)', 
      backdropFilter: 'blur(10px)', 
      padding: '12px', 
      borderRadius: '20px', 
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex', 
      flexDirection: 'column',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    },
    img: { 
      width: '100%', 
      height: '110px', 
      objectFit: 'cover', 
      borderRadius: '12px', 
      marginBottom: '10px' 
    },
    btn: { 
      width: '100%', 
      padding: '10px', 
      marginTop: 'auto', 
      border: 'none', 
      borderRadius: '12px', 
      background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)', 
      color: 'white', 
      fontWeight: 'bold', 
      cursor: 'pointer' 
    }
  };

  return (
    <div style={s.container}>
      <h2 style={{margin: '0 0 10px 0'}}>Game Store</h2>
      <div style={s.grid}>
        {products.map(item => (
          <div key={item.id} style={s.card}>
            <img src={item.img} alt={item.title} style={s.img} />
            <b style={{fontSize: '14px', marginBottom: '5px'}}>{item.title}</b>
            <div style={{margin: '5px 0', color: '#00d2ff', fontWeight: 'bold'}}>{item.price} ₽</div>
            <button style={s.btn} onClick={() => onAdd(item)}>Купить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

