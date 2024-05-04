import React, { useState } from 'react'
import styles from './AuthModal.module.css'
import { useDispatch } from 'react-redux'
import { login, showNotification } from '../../redux/action';
import { authorizedUpdate } from '../../redux/action/authorized';

export default function AuthModal({ typeAction }) {
  const dispatch = useDispatch();
  const succes = (role) => {
    dispatch(authorizedUpdate(true, role))
  }
  const request = async (e) => {
    e.preventDefault();
    console.log(data)
    login(data, succes)
  }
  const [data, setData] = useState({
    mail: '',
    password: '',
  })
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  return (
    <div className={styles.window}>
      <div className={styles.modal}>
        <form className={styles.form} onSubmit={request}>
          <p className={styles.form_title}>Войдите в свой аккаунт</p>
          <div className={styles.input_container}>
            <span>
              почта
            </span>
            <input
              type="email"
              placeholder="введите почту..."
              required
              id="mail"
              name="mail"
              value={data.mail}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_container}>
            <span>
              пароль
            </span>
            <input
              type="password"
              placeholder="введите пароль..."
              required
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.submit}>
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}
