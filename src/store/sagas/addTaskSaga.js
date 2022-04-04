import { call, put, takeEvery } from 'redux-saga/effects'
import { createTask } from 'api/tasks'
import { addTask, addTaskSuccess, addTaskError, getSubTasksByTaskId, resetSortsAndFilters } from "store/slices";

export function* addTaskWorker() {
  try {
    const task = yield call(createTask)

    yield put(getSubTasksByTaskId({ taskId: task.id }))
    yield put(resetSortsAndFilters())
    yield put(addTaskSuccess(task))
  } catch (error) {
    yield put({ type: `${addTaskError}`, error })
  }
}

function* addTaskSaga() {
  yield takeEvery(`${addTask}`, addTaskWorker)
}

export default addTaskSaga
