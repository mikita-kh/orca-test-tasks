import { all } from 'redux-saga/effects'
import {
  fetchTasksSaga,
  addTaskSaga,
  fetchSubTasksSaga,
  removeSubTaskSaga,
  autoRemoveEmptyTaskSaga,
  removeTaskSaga,
} from 'store/sagas'

export default function* () {
  yield all([
    fetchTasksSaga(),
    addTaskSaga(),
    fetchSubTasksSaga(),
    removeSubTaskSaga(),
    removeTaskSaga(),
    autoRemoveEmptyTaskSaga(),
  ])
}
