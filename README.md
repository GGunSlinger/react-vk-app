## How to start work with app

Project not working localy, because politic VK API
Go to created folder and run:
`yarn start` || `npm start` — this will start dev server with hot reload on `localhost:10888`.

Краткое описание приложения: после нажатия кнопки загрузить, начинается загрузка друзей и их друзей, т.к. в vk стоят ограничения, на кол-во запросов за определенный промежуток времени, загрузка длиться примерно 15-20 секунд. После загрузки можно скролить все 10000 пользователей между пагинации и скроллом захотелось попробовать легковесную библиотеку с скроллом.
