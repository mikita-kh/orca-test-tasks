import { createSelector } from '@reduxjs/toolkit'
import { TASKS_NAME, SUB_TASKS_NAME } from 'store/slices'

export const tasksSelector = state => state[TASKS_NAME]
export const tasksItemsSelector = state => state[TASKS_NAME].items
export const tasksLoadingSelector = state => state[TASKS_NAME].isLoading

export const subTasksSelector = state => state[SUB_TASKS_NAME]

export const sortTaskPropertySelector = state => state[TASKS_NAME].sortProperty
export const sortTaskDirectionSelector = state => state[TASKS_NAME].sortDirection
export const searchTasksQuerySelector = state => state[TASKS_NAME].searchQuery
export const subTasksLabelsSelector = state => state[TASKS_NAME].labels

export const allSubTasksLoadedSelector = createSelector(
  [tasksSelector, subTasksSelector],
  (tasks, subtasks) =>
    !tasks.isLoading && tasks.items.every(task => subtasks[task.id]?.items?.length > 0),
)

export const displayedTasksSelector = createSelector(
  [
    tasksItemsSelector,
    subTasksSelector,
    sortTaskPropertySelector,
    sortTaskDirectionSelector,
    searchTasksQuerySelector,
    subTasksLabelsSelector,
  ],
  (tasks, subtasks, sortProperty, sortDirection, searchQuery, labels) => {
    const sortedTasks = [...tasks].sort(
      (l, r) =>
        sortDirection *
        // eslint-disable-next-line no-nested-ternary
        (l[sortProperty] > r[sortProperty] ? 1 : l[sortProperty] < r[sortProperty] ? -1 : 0),
    )

    let displayedTasks = sortedTasks.map(task => ({
      task,
      subtasks: subtasks[task.id],
    }))

    if (searchQuery) {
      displayedTasks = displayedTasks
        .map(({ task, subtasks: st }) => ({
          task,
          subtasks: {
            ...st,
            items: st.items.filter(s => s.title.includes(searchQuery)),
          },
        }))
        .filter(({ task, subtasks: st }) => task.title.includes(searchQuery) || st.items.length > 0)
    }

    if (labels.length) {
      displayedTasks = displayedTasks.map(({ task, subtasks: st }) => ({
        task,
        subtasks: {
          ...st,
          items: st.items.filter(s => labels.every(label => s.labels.includes(label))),
        },
      }))
    }

    return displayedTasks.filter(({ subtasks: st }) => !st?.items || st.items.length > 0)
  },
)
