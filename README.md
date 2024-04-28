# KleinStars Service

## Общая информация

Проект состоит из двух компонентов:
    
    - packages/admin-frontend - содержит административную панель приложения. Подробнее см. packages/admin-frontend/README.md

    - packages/backend - собственно бэкэнд

## Как запустить локально

1. Зарегистрироваться в Яндекс.Cloud и создать 3 бакета в Object Storage:

    - kleinstars
    - kleinstars-video
    - kleinstars-trainer

2. Зарегистрироваться в Expo и создать Push-Token, что позволит отправлять пуш-уведомления в приложении.

3. Поднять PostgreSQL.

4. Прописать конфигурацию для PostgreSQL и Yandex.Cloud в src/config/default.json.

5. Создать `packages/backend/.env` файл и внести туда Access Key и Secret Access Key для Yandex.Cloud, Push Token для Expo, пароль для PostgreSQL, сгенерировать случайные строки для JWT secrets. Структуру файла см. ниже.

6. Прописать URL бэкэнда (по умолчанию http://localhost:3011) в `packages/admin-frontend/.env` (см. структуру ниже).

7. Запустить адмнистративную панель

```
cd packages/admin-frontend && npm ci
npm run start
```

8. Запустить бэкэнд (в другом терминале):

```
cd packages/backend && npm ci
npm run start
```

## Как сделать Docker контейнер

1. Прописать URL бэкэнда в `packages/admin-frontend/.env.staging`

2. Создать билд административной панели. Билд будет автоматически скопирован в `packages/backend/admin-frontend-dist`.

```
cd packages/admin-frontend && npm run build
```

3. Создать Docker контейнер

```
cd packages/backend
./scripts/build.sh
```

## Общие замечения

1. При установленной Environment Variable DATABASE_URL будет использована она, а не указанные в конфигурации/.env файле данные.

## Структура .env файлов

```
packages/backend/.env

DB_PASSWORD=
EXPO_ACCESS_TOKEN=
JWT_SECRET=
REFRESH_SECRET=
YOS_ACCESS_KEY_ID=
YOS_SECRET_ACCESS_KEY=
```

```
packages/admin-frontend/.env
packages/admin-frontend/.env.staging

REACT_APP_SERVER_URL=
```