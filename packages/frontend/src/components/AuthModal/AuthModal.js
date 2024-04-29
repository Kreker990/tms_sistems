import React, { useState } from 'react'
import styles from './AuthModal.module.css'
import { useDispatch } from 'react-redux'
import { login, showNotification } from '../../redux/action';

export default function AuthModal({ typeAction }) {
  const dispatch = useDispatch();
  const request = async (e) => {
    e.preventDefault();
    console.log(data)
    login(data)
  }
  const [data, setData] = useState({
    mail: '',
    password: '',
  })
  return (
    <div className={styles.window}>
      <div className={styles.modal}>
        <form className={styles.form} onSubmit={request}>
          <p className={styles.form_title}>Войдите в свой аккаунт</p>
          <div className={styles.input_container}>
            <span>
              почта
            </span>
            <input type="email" placeholder="введите почту..." required />
          </div>
          <div className={styles.input_container}>
            <span>
              пароль
            </span>
            <input type="password" placeholder="введите пароль..." required />
          </div>
          <button type="submit" className={styles.submit}>
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}
