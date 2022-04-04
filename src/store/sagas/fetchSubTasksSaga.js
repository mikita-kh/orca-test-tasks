import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchSubTasks } from 'api/subTasks'
import {
  getSubTasksByTaskId,
  getSubTasksByTaskIdError,
  getSubTasksByTaskIdSuccess,
} from 'store/slices'

function* fetchSubTasksWorker({ payload: { taskId } }) {
  try {
    const subtasks = yield call(fetchSubTasks, taskId)

    yield put(getSubTasksByTaskIdSuccess({ taskId, subtasks }))
  } catch (error) {
    yield put({ type: getSubTasksByTaskIdError.type, error })
  }
}

function* fetchSubTasksSaga() {
  yield takeEvery(`${getSubTasksByTaskId}`, fetchSubTasksWorker)
}

export default fetchSubTasksSaga
