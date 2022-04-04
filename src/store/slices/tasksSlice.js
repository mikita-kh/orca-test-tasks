import { createSlice } from '@reduxjs/toolkit'
import { SORT_DIRECTION_ASC, SORT_PROPERTY_CREATE_TIME } from './constants'

const initialState = {
  items: [],
  labels: [],
  searchQuery: '',
  sortProperty: SORT_PROPERTY_CREATE_TIME,
  sortDirection: SORT_DIRECTION_ASC,
  isLoading: false,
  error: null,
}

export const TASKS_NAME = 'tasks'

const tasksSlice = createSlice({
  name: TASKS_NAME,
  initialState,
  reducers: {
    getAllTasks: state => ({
      ...state,
      isLoading: true,
    }),
    getAllTasksSuccess: (state, action) => ({
      ...state,
      items: action.payload,
      isLoading: false,
      error: null,
    }),
    getAllTasksError: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),

    addTask: state => ({
      ...state,
      isLoading: true,
    }),
    addTaskSuccess: (state, action) => ({
      ...state,
      items: [...state.items, action.payload],
      isLoading: false,
      error: null,
    }),
    addTaskError: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),

    removeTask: state => ({
      ...state,
      isLoading: true,
    }),
    removeTaskSuccess: (state, action) => ({
      ...state,
      items: state.items.filter(task => task.id !== action.payload.id),
      isLoading: false,
      error: null,
    }),
    removeTaskError: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),

    sortTasks: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    searchTasksAndSubtasksQuery: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    filterTasksAndSubtasksByLabels: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    resetSortsAndFilters: (state) => ({
      ...state,
      labels: [],
      searchQuery: '',
      sortProperty: SORT_PROPERTY_CREATE_TIME,
      sortDirection: SORT_DIRECTION_ASC,
    })
  },
})

export const {
  getAllTasks,
  getAllTasksSuccess,
  getAllTasksError,
  addTask,
  addTaskSuccess,
  addTaskError,
  removeTask,
  removeTaskSuccess,
  removeTaskError,
  sortTasks,
  searchTasksAndSubtasksQuery,
  filterTasksAndSubtasksByLabels,
  resetSortsAndFilters,
} = tasksSlice.actions

export default tasksSlice.reducer
