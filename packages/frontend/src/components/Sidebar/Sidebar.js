import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'; // Стили для Sidebar

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <div className={isOpen ? [styles.open] : styles.sidebar}>
      <button className={styles.close_btn} onClick={toggle}>×</button>
      <Link to="/" onClick={toggle}>Главная</Link>
      <Link to="/about" onClick={toggle}>О нас</Link>
      <Link to="/services" onClick={toggle}>Сервисы</Link>
      <Link to="/contacts" onClick={toggle}>Контакты</Link>
    </div>
  );
};

export default Sidebar;