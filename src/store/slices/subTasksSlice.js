import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const SUB_TASKS_NAME = 'subtasks'

const subTasksSlice = createSlice({
  name: SUB_TASKS_NAME,
  initialState,
  reducers: {
    getSubTasksByTaskId: (state, action) => ({
      ...state,
      [action.payload.taskId]: {
        isLoading: true,
        error: null,
      },
    }),
    getSubTasksByTaskIdSuccess: (state, action) => ({
      ...state,
      [action.payload.taskId]: {
        isLoading: false,
        items: action.payload.subtasks,
      },
    }),
    getSubTasksByTaskIdError: (state, action) => ({
      ...state,
      [action.payload.taskId]: {
        isLoading: false,
        error: action.error,
      },
    }),

    removeSubTask: (state, action) => ({
      ...state,
      [action.payload.taskId]: {
        ...state[action.payload.taskId],
        isLoading: true,
      },
    }),

    removeSubTaskSuccess: (state, action) => ({
      ...state,
      [action.payload.taskId]: {
        ...state[action.payload.taskId],
        items: state[action.payload.taskId].items.filter(item => item.id !== action.payload.id),
        isLoading: false,
        error: null,
      },
    }),
    removeSubTaskError: (state, action) => ({
      ...state,
      [action.payload.taskId]: {
        ...state[action.payload.taskId],
        isLoading: false,
        error: action.error,
      },
    }),
    unsetSubTasks: (state, action) => {
      const { [action.payload.taskId]: _, ...nextState } = state

      return nextState
    },
  },
})

export const {
  getSubTasksByTaskId,
  getSubTasksByTaskIdSuccess,
  getSubTasksByTaskIdError,
  removeSubTask,
  removeSubTaskSuccess,
  removeSubTaskError,
  unsetSubTasks,
} = subTasksSlice.actions

export default subTasksSlice.reducer
