import { call, put, takeEvery } from 'redux-saga/effects'
import { deleteSubtask } from 'api/subTasks'
import { removeSubTask, removeSubTaskError, removeSubTaskSuccess } from 'store/slices'

function* deleteSubTaskWorker({ payload: subtask }) {
  try {
    yield call(deleteSubtask, subtask.id)

    yield put(removeSubTaskSuccess(subtask))
  } catch (error) {
    yield put({ type: removeSubTaskError.type, error })
  }
}

function* removeSubTaskSaga() {
  yield takeEvery(`${removeSubTask}`, deleteSubTaskWorker)
}

export default removeSubTaskSaga
