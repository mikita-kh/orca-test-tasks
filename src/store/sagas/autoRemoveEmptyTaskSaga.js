import { take, select, put } from 'redux-saga/effects'
import { removeTask, removeSubTaskSuccess } from 'store/slices'
import { subTasksSelector } from 'store/selectors'

function* autoRemoveEmptyTaskSaga() {
  while (true) {
    const {
      payload: { taskId },
    } = yield take(`${removeSubTaskSuccess}`)
    const subtasks = yield select(subTasksSelector)

    if (subtasks[taskId].items.length === 0) {
      yield put(removeTask({ id: taskId }))
    }
  }
}

export default autoRemoveEmptyTaskSaga
