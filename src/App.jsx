import { useEffect } from 'react';
import { motion } from 'framer-motion';
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
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      overflowX: 'hidden'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '28px',
      fontWeight: '800',
      textShadow: '0 0 15px rgba(0, 210, 255, 0.5)'
    },
    sectionTitle: { 
      textAlign: 'left', 
      padding: '0 25px', 
      margin: '25px 0 15px', 
      fontSize: '20px', 
      fontWeight: 'bold',
      color: '#00d2ff',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    card: { 
      background: 'rgba(255, 255, 255, 0.07)', 
      backdropFilter: 'blur(15px)', 
      padding: '15px', 
      borderRadius: '32px', 
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      boxSizing: 'border-box'
    },
    img: { 
      width: '100%', 
      height: '130px', 
      objectFit: 'cover', 
      borderRadius: '22px', 
      marginBottom: '12px' 
    },
    title: { fontSize: '16px', marginBottom: '6px', display: 'block' },
    price: { color: '#00d2ff', fontWeight: 'bold', fontSize: '18px', marginBottom: '15px' },
    btn: { 
      width: '100%', 
      padding: '12px', 
      border: 'none', 
      borderRadius: '18px', 
      background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)', 
      color: 'white', 
      fontWeight: 'bold',
      boxShadow: '0 5px 15px rgba(0, 210, 255, 0.3)'
    }
  };

  const renderCategory = (title, items) => (
    <div style={{marginBottom: '30px'}}>
      <div style={s.sectionTitle}>{title}</div>
      <Swiper 
        slidesPerView={'auto'} 
        spaceBetween={15} 
        style={{padding: '0 20px', overflow: 'visible'}}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id} style={{ width: '220px' }}>
            <motion.div 
              style={s.card}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.97 }}
            >
              <img src={item.img} alt={item.title} style={s.img} />
              <span style={s.title}>{item.title}</span>
              <div style={s.price}>{item.price} ₽</div>
              <motion.button 
                style={s.btn} 
                onClick={() => onAdd(item)}
                whileTap={{ scale: 0.9 }}
              >
                Купить
              </motion.button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return (
    <div style={s.container}>
      <motion.h2 
        style={s.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        GAME INDUSTRY
      </motion.h2>
      
      {renderCategory('🔥 Популярное', categories.hits)}
      {renderCategory('✨ Новинки', categories.new)}
      
      <p style={{textAlign: 'center', opacity: 0.5, fontSize: '12px', marginTop: '20px'}}>
        Выберите игру для оформления заказа
      </p>
    </div>
  );
}

export default App;

