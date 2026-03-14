import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const tg = window.Telegram?.WebApp;

const categories = {
  hits: [
    {id: 1, title: 'Minecraft', price: 1500, img: '/mc.jpg'},
    {id: 2, title: 'GTA V', price: 2500, img: '/gta.jpg'},
  ],
  new: [
    {id: 3, title: 'Elden Ring', price: 3999, img: '/elden.jpg'},
    {id: 4, title: 'Cyberpunk 2077', price: 2000, img: '/cyber.jpg'},
  ]
};

function App() {
  useEffect(() => {
    tg?.ready();
    tg?.expand();
  }, []);

  const onAdd = (item) => {
    tg.MainButton.setText(`Купить ${item.title} за ${item.price}₽`);
    tg.MainButton.show();
    tg.sendData(JSON.stringify(item)); 
  };

  const s = {
    container: { 
      padding: '20px 0', 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', 
      color: 'white',
      fontFamily: 'sans-serif'
    },
    sectionTitle: { textAlign: 'left', padding: '0 20px', margin: '20px 0 10px', fontSize: '20px', color: '#00d2ff' },
    card: { 
      background: 'rgba(255, 255, 255, 0.05)', 
      backdropFilter: 'blur(10px)', 
      padding: '15px', 
      borderRadius: '20px', 
      border: '1px solid rgba(255, 255, 255, 0.1)',
      width: '200px', // Фиксированная ширина для слайда
      margin: '10px'
    },
    img: { width: '100%', height: '120px', objectFit: 'cover', borderRadius: '15px', marginBottom: '10px' },
    btn: { 
      width: '100%', padding: '10px', border: 'none', borderRadius: '12px', 
      background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)', 
      color: 'white', fontWeight: 'bold' 
    }
  };

  const renderCategory = (title, items) => (
    <>
      <h3 style={s.sectionTitle}>{title}</h3>
      <Swiper slidesPerView={'auto'} spaceBetween={10} style={{padding: '0 10px'}}>
        {items.map((item, index) => (
          <SwiperSlide key={item.id} style={{width: 'auto'}}>
            <motion.div 
              style={s.card}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img src={item.img} alt={item.title} style={s.img} />
              <div style={{marginBottom: '10px', fontWeight: 'bold'}}>{item.title}</div>
              <div style={{color: '#00d2ff', marginBottom: '10px'}}>{item.price} ₽</div>
              <button style={s.btn} onClick={() => onAdd(item)}>Купить</button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );

  return (
    <div style={s.container}>
      <h2 style={{textAlign: 'center', margin: '0 0 20px'}}>Game Store</h2>
      
      {renderCategory('🔥 Популярное', categories.hits)}
      {renderCategory('✨ Новинки', categories.new)}
      
    </div>
  );
}

export default App;

