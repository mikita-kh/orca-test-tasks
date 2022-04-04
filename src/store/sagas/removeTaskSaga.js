import { call, put, takeEvery } from 'redux-saga/effects'
import { removeTask, removeTaskError, removeTaskSuccess, unsetSubTasks } from 'store/slices'
import { deleteTask } from 'api/tasks'

function* removeTaskWorker({ payload: task }) {
  try {
    yield call(deleteTask, task.id)

    yield put(removeTaskSuccess(task))
    yield put(unsetSubTasks({ taskId: task.id }))
  } catch (error) {
    yield put({ type: removeTaskError.type, error })
  }
}

function* removeTaskSaga() {
  yield takeEvery(`${removeTask}`, removeTaskWorker)
}

export default removeTaskSaga
