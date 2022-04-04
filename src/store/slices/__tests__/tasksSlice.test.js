import reducer, {
  getAllTasks,
  getAllTasksSuccess,
  addTaskSuccess,
  removeTaskSuccess,
} from '../tasksSlice'
import { SORT_DIRECTION_ASC, SORT_PROPERTY_CREATE_TIME } from '../constants'

const initialState = {
  items: [],
  labels: [],
  searchQuery: '',
  sortProperty: SORT_PROPERTY_CREATE_TIME,
  sortDirection: SORT_DIRECTION_ASC,
  isLoading: false,
  error: null,
}

describe('tasksSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState)
  })

  it('should handle a isLoading being set to true', () => {
    expect(reducer({}, getAllTasks())).toStrictEqual({ isLoading: true })
  })

  it('should handle a tasks being set to store', () => {
    const tasks = [{ id: 1 }, { id: 2 }]

    expect(reducer({}, getAllTasksSuccess(tasks))).toStrictEqual({
      isLoading: false,
      error: null,
      items: tasks,
    })
  })

  it('should handle a task being added to tasks', () => {
    expect(
      reducer(
        {
          items: [{ id: 1 }, { id: 2 }],
        },
        addTaskSuccess({ id: 3 }),
      ),
    ).toStrictEqual({
      isLoading: false,
      error: null,
      items: [{ id: 1 }, { id: 2 }, { id: 3 }],
    })
  })

  it('should handle a task being removed from tasks', () => {
    const tasks = [{ id: 1 }, { id: 2 }, { id: 3 }]

    expect(
      reducer(
        {
          items: tasks,
        },
        removeTaskSuccess({ id: 2 }),
      ),
    ).toStrictEqual({
      isLoading: false,
      error: null,
      items: [{ id: 1 }, { id: 3 }],
    })
  })
})
