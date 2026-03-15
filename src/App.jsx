import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const tg = window.Telegram?.WebApp;

const categories = {
  hits: [
    {id: 1, title: 'Minecraft', price: 1500, img: '/mc.jpg'},
    {id: 2, title: 'GTA V', price: 2500, img: '/gta.jpg'},
    {id: 5, title: 'FIFA 24', price: 4500, img: '/fifa2024.jpg'},
  ],
  new: [
    {id: 3, title: 'Elden Ring', price: 3999, img: '/elden.jpg'},
    {id: 4, title: 'Cyberpunk 2077', price: 2000, img: '/cyber.jpg'},
    {id: 6, title: 'Starfield', price: 3500, img: '/starfield.jpg'},
  ]
};

const news = [
  { id: 1, title: "🔥 Скидка на GTA V!", desc: "Только на этих выходных забирай легенду со скидкой 30%." },
  { id: 2, title: "🚀 Новинка: Starfield", desc: "Исследуй бесконечный космос прямо сейчас. Ключи в наличии!" }
];

function App() {
  const [view, setView] = useState('news'); // 'news', 'shop', 'info'

  useEffect(() => {
    tg?.ready();
    tg?.expand();
  }, []);

  const onAdd = (item) => {
    tg.MainButton.setText(`Заказать ${item.title}`);
    tg.MainButton.show();
    tg.sendData(JSON.stringify(item));
  };

  const s = {
    container: { 
      padding: '20px 0', minHeight: '100vh', color: 'white',
      background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      fontFamily: 'sans-serif', position: 'relative', overflowX: 'hidden'
    },
    topBtn: {
      position: 'absolute', top: '15px', left: '15px', zIndex: 10,
      background: 'rgba(255,255,255,0.1)', borderRadius: '50%',
      width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    card: { 
      background: 'rgba(255, 255, 255, 0.07)', backdropFilter: 'blur(15px)', 
      padding: '15px', borderRadius: '30px', border: '1px solid rgba(255, 255, 255, 0.1)',
      width: '220px', boxSizing: 'border-box'
    },
    btn: { 
      width: '100%', padding: '12px', border: 'none', borderRadius: '18px', 
      background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)', 
      color: 'white', fontWeight: 'bold', marginTop: '10px'
    }
  };

  const renderCategory = (title, items) => (
    <div style={{marginBottom: '30px'}}>
      <h3 style={{padding: '0 25px', color: '#00d2ff'}}>{title}</h3>
      <Swiper slidesPerView={'auto'} spaceBetween={15} style={{padding: '0 20px', overflow: 'visible'}}>
        {items.map((item) => (
          <SwiperSlide key={item.id} style={{ width: '220px' }}>
            <div style={s.card}>
              <img src={item.img} style={{width: '100%', height: '120px', borderRadius: '20px', objectFit: 'cover'}} />
              <div style={{margin: '10px 0 5px', fontWeight: 'bold'}}>{item.title}</div>
              <div style={{color: '#00d2ff'}}>{item.price} ₽</div>
              <button style={s.btn} onClick={() => onAdd(item)}>Купить</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return (
    <div style={s.container}>
      {/* Кнопка ИНФО */}
      {view !== 'info' && (
        <div style={s.topBtn} onClick={() => setView('info')}>ℹ️</div>
      )}

      <AnimatePresence mode="wait">
        {view === 'news' && (
          <motion.div key="news" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} style={{padding: '60px 20px 20px'}}>
            <h2 style={{textAlign:'center'}}>НОВОСТИ ⚡️</h2>
            {news.map(n => (
              <div key={n.id} style={{background: 'rgba(255,255,255,0.05)', padding:'20px', borderRadius:'25px', marginBottom:'15px', border:'1px solid rgba(0,200,255,0.2)'}}>
                <h3 style={{color:'#00d2ff', margin:'0 0 10px'}}>{n.title}</h3>
                <p style={{fontSize:'14px', opacity:0.8}}>{n.desc}</p>
                <button style={{...s.btn, width:'auto', padding:'10px 25px'}} onClick={() => setView('shop')}>В магазин →</button>
              </div>
            ))}
          </motion.div>
        )}

        {view === 'shop' && (
          <motion.div key="shop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={{paddingTop: '40px'}}>
             <h2 style={{textAlign:'center', marginBottom: '30px'}}>МАГАЗИН</h2>
             {renderCategory('🔥 Популярное', categories.hits)}
             {renderCategory('✨ Новинки', categories.new)}
             <button style={{...s.btn, width:'200px', display:'block', margin:'20px auto'}} onClick={() => setView('news')}>🔙 К новостям</button>
          </motion.div>
        )}

        {view === 'info' && (
          <motion.div key="info" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0}} style={{padding: '60px 20px', textAlign:'center'}}>
            <h2 style={{color:'#00d2ff'}}>ИНФОРМАЦИЯ</h2>
            <p>Мы — Game Industry. <br/> Лучшие цены на ключи.</p>
            <button style={s.btn} onClick={() => setView('shop')}>Начать покупки</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

