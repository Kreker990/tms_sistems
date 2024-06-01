import { API_AUTH, API_DRIVERS, API_ORDERS } from "../config";
import { getOrdersDriver } from "./getOrderByIdDriver";
import toast from "react-hot-toast";


export function showNotification(type, text) {
  const notification = document.getElementById('notification');
  if (type === 'red') {
    notification.style.backgroundColor = `rgb(255,0,0)`
    notification.innerHTML = 'Удалено успешно!'
  } else {
    notification.style.backgroundColor = `#28a745`
    notification.innerHTML = 'Сохранено успешно!'
  }
  if (text) {
    notification.innerHTML = text
  }
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

export const login = async ({ mail, password }, succes) => {
  try {
    const response = await fetch(API_AUTH, {
      method: 'POST', // Метод запроса
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ // Тело запроса в формате JSON
        mail: mail,
        password: password
      })
    });
    if (response.ok) {
      const data = await response.json(); // Ожидаем и преобразуем ответ в JSON
      succes(data.role);
      localStorage.setItem('token', data.token);
      localStorage.setItem('mail', mail);
      localStorage.setItem('role', data.role);
      localStorage.setItem('id', data.id);
      showNotification('', 'Успешно!')
      return
    }
    showNotification('red', 'Пользователь не существует!')
  } catch (error) {
    console.error('Ошибка:', error); // Ловим и выводим ошибки запроса или JSON-преобразования
  }
}
export const loginDriver = async ({ mail, password }, succes, dispatch) => {
  try {
    const response = await fetch(API_DRIVERS + '/auth', {
      method: 'POST', // Метод запроса
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ // Тело запроса в формате JSON
        mail: mail,
        password: password
      })
    });
    if (response.ok) {
      const data = await response.json(); // Ожидаем и преобразуем ответ в JSON
      succes('driver');
      localStorage.setItem('token', data.token);
      localStorage.setItem('mail', mail);
      localStorage.setItem('role', 'driver');
      localStorage.setItem('id', data.id);
      dispatch(getOrdersDriver(data.token))
      showNotification('', 'Успешно!')
      return
    }
    showNotification('red', 'Пользователь не существует!')
  } catch (error) {
    console.error('Ошибка:', error); // Ловим и выводим ошибки запроса или JSON-преобразования
  }
}

export const checkAuth = (succes) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (token) {
    succes(role)
  }
}

export const getPdfFile = async (ordersData) => {
  console.log(ordersData)
  try {
    const response = await fetch(API_ORDERS + '/pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ordersData),
    });
    if (!response.ok) {
      toast.error('нету заказов');
      throw new Error('Network response was not ok');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error('Error:', error);
  }
};
