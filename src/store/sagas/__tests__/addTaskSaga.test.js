import { expectSaga, testSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import addTaskSaga, { addTaskWorker } from 'store/sagas/addTaskSaga'
import { createTask } from 'api/tasks'

const mockTask = { id: 42, name: 'Task' }

describe('addTaskSaga', () => {
  it('addTaskWorker', async () => {
    const { effects } = await expectSaga(addTaskWorker)
      .provide([[matchers.call.fn(createTask), mockTask]])
      .run()

    expect(effects.put).toHaveLength(3)

    expect(effects.put[0].payload.action).toStrictEqual({
      payload: { taskId: mockTask.id },
      type: 'subtasks/getSubTasksByTaskId',
    })
    expect(effects.put[1].payload.action).toStrictEqual({
      payload: undefined,
      type: 'tasks/resetSortsAndFilters',
    })
    expect(effects.put[2].payload.action).toStrictEqual({
      payload: mockTask,
      type: 'tasks/addTaskSuccess',
    })
  })

  it('addTaskSaga', () => {
    testSaga(addTaskSaga).next().takeEvery('tasks/addTask', addTaskWorker).finish().isDone()
  })
})
