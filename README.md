# <h1>:zap: Moneys :zap:</h1>
<p>Курсовой проект для менеджмента денег. Выполняет CRUD действия над счетами и транзакциями, подводит статистику доходов/расходов.</p>

<p>Состоит из трёх частей:</p>
<ul>
  <li>:memo: Сервер аутентификации/регистрации</li>
  <li>:goal_net: API</li>
  <li>:globe_with_meridians: Клиентское приложение</li>
</ul>

<h2>:memo: Сервер аутентификации</h2>
<p>Реализован Identity Server 4 :fire: Доступен вход/регистрация через Google</p>
<p>Исходники: https://github.com/Yaniddze/Moneys/tree/master/IdentityServer</p>
<p>Попробовать: https://yaniddze.com/Account/Login</p>

<h2>:goal_net: API</h2>
<p>Используется C# и GraphQL реализован с помощью библиотеки HotChocolate :boom:</p>
<p>Для выполнения запросов требуется access token в заголовке, который можно получить только авторизовавшись (см. Сервер аутентификации)</p>
<p>Исходники: https://github.com/Yaniddze/Moneys/tree/master/MoneyApi</p>
<p>Playground: https://yaniddze.com/api/moneys/playground/ (сам API расположен здесь https://yaniddze.com/api/moneys)</p>

<h2>:globe_with_meridians: Клиентское приложение</h2>
<p>Клиент создан с помощью фреймворка Next.js :rocket:</p>
<p>Также используется TypeScript :wrench: styled-components :hammer: matrial-ui :art: и oidc-client для аутентификации :lock:</p>
<p>Исходники: https://github.com/Yaniddze/Moneys/tree/master/next_app</p>
<p>Пока не деплойнуто</p>
