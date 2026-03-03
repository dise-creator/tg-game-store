import { useEffect } from 'react';

const tg = window.Telegram?.WebApp;

const products = [
  {id: 1, title: 'Minecraft', price: 1500, img: 'https://img.vsemayki.ru/get/0/1/3277/3277054/img_v2_1000.jpg'},
  {id: 2, title: 'GTA V', price: 2500, img: 'https://media-rockstargames-com.akamaized.net/rockstargames-new/img/global/games/fob/640/V.jpg'},
  {id: 3, title: 'Elden Ring', price: 3999, img: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aajm8sY4wS6pOf9f9S066N7E.png'},
  {id: 4, title: 'Cyberpunk 2077', price: 2000, img: 'https://s3.gaming-cdn.com/images/products/3216/orig/cyberpunk-2077-pc-game-gog-com-cover.jpg?v=1651586733'}
];

function App() {
  useEffect(() => {
    tg?.ready();
    tg?.expand();
  }, []);

  const onAdd = (item) => {
    tg.MainButton.setText(`Купить ${item.title} за ${item.price}₽`);
    tg.MainButton.show();
    tg.HapticFeedback.impactOccurred('medium');
  };

  const s = {
    container: { padding: '20px', textAlign: 'center', background: 'var(--tg-theme-bg-color)', color: 'var(--tg-theme-text-color)', minHeight: '100vh', fontFamily: 'sans-serif' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' },
    card: { background: 'var(--tg-theme-secondary-bg-color)', padding: '10px', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' },
    img: { width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px', display: 'block' },
    btn: { width: '100%', padding: '10px', marginTop: 'auto', border: 'none', borderRadius: '10px', background: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)', fontWeight: 'bold', cursor: 'pointer' }
  };

  return (
    <div style={s.container}>
      <h2 style={{margin: '0 0 10px 0'}}>Привет, {tg?.initDataUnsafe?.user?.first_name || 'Геймер'}!</h2>
      <div style={s.grid}>
        {products.map(item => (
          <div key={item.id} style={s.card}>
            <img src={item.img} alt={item.title} style={s.img} />
            <b style={{fontSize: '14px'}}>{item.title}</b>
            <div style={{margin: '5px 0', color: 'var(--tg-theme-button-color)', fontWeight: 'bold'}}>{item.price} ₽</div>
            <button style={s.btn} onClick={() => onAdd(item)}>Купить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
