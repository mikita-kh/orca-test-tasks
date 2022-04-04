# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

Задание заключается в создании таск менеджера. Имеются следующие сущности:

```typescript
interface Task {
  id: string;
  title: string;
  createTime: number;
}
```

```ts
interface SubTask {
  id: string
  title: string
  labels: string[]
}
```

Необходимо реализовать функционал, используя фейк АПИ из src/api (все поля заполняются случайными значениями):
* просмотр списка задач (fetchTasksSaga())
* просмотр списка подзадач каждой задачи (fetchSubTasks(takskId))
* создание новой задачи (createTask())
* удаление подзадачи - если в задаче не осталось подзадач - задача также должна быть удалена (deleteSubTask(subTaskId))
* сортировка задач по имени и времени создания
* поиск задач и подзадач по title - результат должен включать все задачи и подзадачи, которые совпадают с поисковым запросом
* <b>*</b> фильтрация подзадач по label - должны отображаться все задачи, у которых подзадачи совпадают с активным фильтром по лейблу (должен поддерживаться множественный выбор лейблов)


Требования к фронтенду:
* необходимо использовать связку React + Redux (мы дополнительно используем redux-toolkit, но это опционально)
* redux-saga для сайд-эффектов
* сущности (саги, селекторы, редьюсеры) хотелось бы видеть покрытыми тестами (мы для саг используем redux-saga-test-plan)
* стилизация компонентов через styled-components
* дизайн абсолютно свободный