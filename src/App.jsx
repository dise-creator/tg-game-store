import { useEffect } from 'react'
import './App.css'

function App() {
  const tg = window.Telegram.WebApp;

  useEffect(() => {
    // Сообщаем Telegram, что приложение готово к работе
    tg.ready();
    // Разворачиваем приложение на всю высоту экрана
    tg.expand();
  }, [])

  const onClose = () => {
    tg.close();
  }

  return (
    <div className="App">
      <h1>Game Store</h1>
      <div className="user-info">
        <p>Привет, <b>{tg.initDataUnsafe?.user?.first_name || "Геймер"}</b>!</p>
      </div>
      
      <div className="card-container">
        <div className="card">
          <h3>Крутая игра #1</h3>
          <button>Купить за 100 ★</button>
        </div>
      </div>

      <button className="close-btn" onClick={onClose}>
        Закрыть магазин
      </button>
    </div>
  )
}

export default App
