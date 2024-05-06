<h2 align="center">Cервис комментариев</h3>

---

<p align="center">Тренировочное задание Fullstack.<br></p>

##  Содержание

- [О проекте](#about)
- [Начало работы](#getting_started)
- [Построен с использованием](#built_using)


##  <a name="about">о проекте</a>
Проект позволяет  создавать, редактировать, удалять комментарии
 
## Начало работы<a name="getting_started"></a>

1. Собрать образы (фронт требует сборки)

```
docker-compose -f docker/docker-compose.yml   build --no-cache
```
1. Развернуть контейнеры  для всех сервисов
   1. postgres-БД Postgres
   2. pgadmin- pgAdmin
   3. api - разработанный бекенд
   4. frontend - разработанный фронтенд

```
docker-compose -f docker/docker-compose.yml  up
```

3. Открыть интерфейс на 3000

## Построен с использованием<a name="built_using"></a>

### Frontend

- [React](https://react.dev/) — Веб-фреймворк
- [react-router-dom](https://reactrouter.com/en/6.21.0) - Роутинг 
- [React Hook Form](https://react-hook-form.com/) -Формы
- [Gravity UI](https://gravity-ui.com/) - UIKit

### Backend

- [Express JS](https://expressjs.com/ru/) 
- [Node Postgres](https://node-postgres.com/)  