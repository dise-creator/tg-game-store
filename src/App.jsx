import { useEffect } from 'react';

const tg = window.Telegram?.WebApp;

const products = [
  {id: 1, title: 'Minecraft', price: 1500, img: 'https://www.minecraft.net/content/dam/games/minecraft/key-art/Games_Subnav_Minecraft-Wild-Update_600x338.jpg'},
  {id: 2, title: 'GTA V', price: 2500, img: 'https://media-rockstargames-com.akamaized.net/rockstargames-new/img/global/games/fob/640/V.jpg'},
  {id: 3, title: 'Elden Ring', price: 3999, img: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aajm8sY4wS6pOf9f9S066N7E.png'},
  {id: 4, title: 'Cyberpunk 2077', price: 2000, img: 'https://m.media-amazon.com/images/I/81st6fX8pML._AC_SL1500_.jpg'}
];

function App() {
  useEffect(() => {
    tg?.ready();
    tg?.expand();
  }, []);

  const onAdd = (item) => {
    tg.MainButton.setText(`Купить ${item.title}`);
    tg.MainButton.show();
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', background: '#1c1c1c', color: 'white', minHeight: '100vh' }}>
      <h2>Store</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {products.map(item => (
          <div key={item.id} style={{ background: '#2c2c2c', padding: '10px', borderRadius: '15px' }}>
           <img 
  src={item.img} 
  alt={item.title} 
  style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '10px' }} 
/>
            <div style={{fontWeight: 'bold', margin: '5px 0'}}>{item.title}</div>
            <button 
              onClick={() => onAdd(item)}
              style={{ width: '100%', padding: '8px', border: 'none', borderRadius: '8px', background: '#0088cc', color: 'white' }}
            >
              {item.price} ₽
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

