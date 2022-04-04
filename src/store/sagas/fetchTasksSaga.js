import { all, call, put, takeLatest } from 'redux-saga/effects'
import { fetchTasks } from 'api/tasks'
import {
  getAllTasks,
  getAllTasksSuccess,
  getAllTasksError,
  getSubTasksByTaskId,
} from 'store/slices'

function* fetchTasksWorker() {
  try {
    const tasks = yield call(fetchTasks)

    if (tasks.length > 0) {
      yield all(tasks.map(task => put(getSubTasksByTaskId({ taskId: task.id }))))
    }

    yield put(getAllTasksSuccess(tasks))
  } catch (error) {
    yield put({ type: getAllTasksError.type, error })
  }
}

function* fetchTasksSaga() {
  yield takeLatest(`${getAllTasks}`, fetchTasksWorker)
}

export default fetchTasksSaga
