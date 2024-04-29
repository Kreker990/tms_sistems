import { API_AUTH } from "../config";

export function showNotification(type) {
  const notification = document.getElementById('notification');
  if (type === 'red') {
    notification.style.backgroundColor = `rgb(255,0,0)`
    notification.innerHTML = 'Удалено успешно!'
  } else {
    notification.style.backgroundColor = `#28a745`
    notification.innerHTML = 'Сохранено успешно!'
  }
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

export const login = async ({ mail, password }) => {
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

    const data = await response.json(); // Ожидаем и преобразуем ответ в JSON
    console.log('Успешный ответ:', data);
  } catch (error) {
    console.error('Ошибка:', error); // Ловим и выводим ошибки запроса или JSON-преобразования
  }
}