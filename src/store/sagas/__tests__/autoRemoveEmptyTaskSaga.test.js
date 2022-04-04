import { expectSaga } from 'redux-saga-test-plan'
import { select } from 'redux-saga/effects'
import autoRemoveEmptyTaskSaga from 'store/sagas/autoRemoveEmptyTaskSaga'
import { removeSubTaskSuccess } from 'store/slices'
import { subTasksSelector } from 'store/selectors'

const taskId = 42

describe('autoRemoveEmptyTaskSaga', () => {
  it('should call removeTask', async () => {
    const { effects } = await expectSaga(autoRemoveEmptyTaskSaga)
      .provide([
        [
          select(subTasksSelector),
          {
            [taskId]: { items: [] },
          },
        ],
      ])
      .dispatch(removeSubTaskSuccess({ taskId }))
      .silentRun()

    expect(effects.put[0].payload.action).toStrictEqual({
      type: 'tasks/removeTask',
      payload: { id: taskId },
    })
  })

  it('should not call removeTask', async () => {
    const { effects } = await expectSaga(autoRemoveEmptyTaskSaga)
      .provide([
        [
          select(subTasksSelector),
          {
            [taskId]: { items: [{ taskId }] },
          },
        ],
      ])
      .dispatch(removeSubTaskSuccess({ taskId }))
      .silentRun()

    expect(effects.put).toBeUndefined()
  })
})
