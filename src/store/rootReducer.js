import { createBrowserHistory } from 'history'
import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { tasksReducer, subTasksReducer, TASKS_NAME, SUB_TASKS_NAME } from 'store/slices'

const history = createBrowserHistory()

const reducer = combineReducers({
  router: connectRouter(history),
  [TASKS_NAME]: tasksReducer,
  [SUB_TASKS_NAME]: subTasksReducer,
})

export { history }

export default reducer
