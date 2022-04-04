import {
  SORT_DIRECTION_ASC,
  SORT_DIRECTION_DESC,
  SORT_PROPERTY_CREATE_TIME,
  SORT_PROPERTY_TITLE,
} from 'store/slices'
import { displayedTasksSelector } from '..'

describe('displayedTasksSelector', () => {
  it('should return empty list', () => {
    // tasks, subtasks, sortProperty, sortDirection, searchQuery, labels
    expect(
      displayedTasksSelector.resultFunc(
        [],
        {},
        SORT_PROPERTY_CREATE_TIME,
        SORT_DIRECTION_ASC,
        '',
        [],
      ),
    ).toStrictEqual([])
  })

  it('should return transformed tasks', () => {
    // tasks, subtasks, sortProperty, sortDirection, searchQuery, labels
    expect(
      displayedTasksSelector.resultFunc(
        [{ id: 1 }],
        { 1: { isLoading: true } },
        SORT_PROPERTY_CREATE_TIME,
        SORT_DIRECTION_ASC,
        '',
        [],
      ),
    ).toStrictEqual([
      {
        task: { id: 1 },
        subtasks: {
          isLoading: true,
        },
      },
    ])
  })

  it('should return transformed tasks with subtasks', () => {
    // tasks, subtasks, sortProperty, sortDirection, searchQuery, labels
    expect(
      displayedTasksSelector.resultFunc(
        [{ id: 1 }],
        { 1: { items: [{ id: 2 }] } },
        SORT_PROPERTY_CREATE_TIME,
        SORT_DIRECTION_ASC,
        '',
        [],
      ),
    ).toStrictEqual([
      {
        task: { id: 1 },
        subtasks: {
          items: [{ id: 2 }],
        },
      },
    ])
  })

  it('should return sorted by title tasks', () => {
    const tasks = [
      { id: 1, title: 'D' },
      { id: 2, title: 'A' },
      { id: 3, title: 'C' },
      { id: 4, title: 'B' },
    ]

    // tasks, subtasks, sortProperty, sortDirection, searchQuery, labels
    expect(
      displayedTasksSelector.resultFunc(
        tasks,
        tasks.reduce((st, { id }) => ({ ...st, [id]: {} }), {}),
        SORT_PROPERTY_TITLE,
        SORT_DIRECTION_ASC,
        '',
        [],
      ),
    ).toStrictEqual([
      {
        subtasks: {},
        task: {
          id: 2,
          title: 'A',
        },
      },
      {
        subtasks: {},
        task: {
          id: 4,
          title: 'B',
        },
      },
      {
        subtasks: {},
        task: {
          id: 3,
          title: 'C',
        },
      },
      {
        subtasks: {},
        task: {
          id: 1,
          title: 'D',
        },
      },
    ])
  })

  it('should return reverse sorted by title tasks', () => {
    const tasks = [
      { id: 1, title: 'D' },
      { id: 2, title: 'A' },
      { id: 3, title: 'C' },
      { id: 4, title: 'B' },
    ]

    // tasks, subtasks, sortProperty, sortDirection, searchQuery, labels
    expect(
      displayedTasksSelector.resultFunc(
        tasks,
        tasks.reduce((st, { id }) => ({ ...st, [id]: {} }), {}),
        SORT_PROPERTY_TITLE,
        SORT_DIRECTION_DESC,
        '',
        [],
      ),
    ).toStrictEqual(
      [
        {
          subtasks: {},
          task: {
            id: 2,
            title: 'A',
          },
        },
        {
          subtasks: {},
          task: {
            id: 4,
            title: 'B',
          },
        },
        {
          subtasks: {},
          task: {
            id: 3,
            title: 'C',
          },
        },
        {
          subtasks: {},
          task: {
            id: 1,
            title: 'D',
          },
        },
      ].reverse(),
    )
  })

  it('should return filtered by title tasks and subtasks', () => {
    const tasks = [
      { id: 1, title: 'D' },
      { id: 2, title: 'A' },
      { id: 3, title: 'C' },
      { id: 4, title: 'B' },
    ]

    const subtasks = {
      1: { items: [{ title: 'SA' }] },
      2: { items: [{ title: 'SB' }] },
      3: { items: [{ title: 'SC' }] },
      4: { items: [{ title: 'SD' }] },
    }

    // tasks, subtasks, sortProperty, sortDirection, searchQuery, labels
    expect(
      displayedTasksSelector.resultFunc(
        tasks,
        subtasks,
        SORT_PROPERTY_TITLE,
        SORT_DIRECTION_DESC,
        'A',
        [],
      ),
    ).toStrictEqual([
      {
        subtasks: {
          items: [
            {
              title: 'SA',
            },
          ],
        },
        task: {
          id: 1,
          title: 'D',
        },
      },
    ])
  })
  it('should return filtered by labels tasks with subtasks', () => {
    const tasks = [
      { id: 1, title: 'D' },
      { id: 2, title: 'A' },
      { id: 3, title: 'C' },
      { id: 4, title: 'B' },
    ]

    const subtasks = {
      1: {
        items: [
          { title: 'SA1', labels: ['LB', 'LC'] },
          { title: 'SA2', labels: ['LA'] },
          { title: 'SA3', labels: ['LA', 'LD'] },
        ],
      },
      2: { items: [{ title: 'SB', labels: ['LC'] }] },
      3: { items: [{ title: 'SC', labels: ['LB'] }] },
      4: { items: [{ title: 'SD', labels: ['LA', 'LB', 'LC', 'LD'] }] },
    }

    // tasks, subtasks, sortProperty, sortDirection, searchQuery, labels
    expect(
      displayedTasksSelector.resultFunc(
        tasks,
        subtasks,
        SORT_PROPERTY_TITLE,
        SORT_DIRECTION_DESC,
        '',
        ['LA', 'LD'],
      ),
    ).toStrictEqual([
      {
        subtasks: {
          items: [
            {
              labels: ['LA', 'LD'],
              title: 'SA3',
            },
          ],
        },
        task: {
          id: 1,
          title: 'D',
        },
      },
      {
        subtasks: {
          items: [
            {
              labels: ['LA', 'LB', 'LC', 'LD'],
              title: 'SD',
            },
          ],
        },
        task: {
          id: 4,
          title: 'B',
        },
      },
    ])
  })

  it('should return filtered by title and labels tasks with subtasks', () => {
    const tasks = [
      { id: 1, title: 'D' },
      { id: 2, title: 'A' },
      { id: 3, title: 'C' },
      { id: 4, title: 'B' },
    ]

    const subtasks = {
      1: {
        items: [
          { title: 'SA1', labels: ['LB', 'LC'] },
          { title: 'SA2', labels: ['LA'] },
          { title: 'SA3', labels: ['LA', 'LD'] },
        ],
      },
      2: { items: [{ title: 'SB', labels: ['LC'] }] },
      3: { items: [{ title: 'SC', labels: ['LB'] }] },
      4: { items: [{ title: 'SD', labels: ['LA', 'LB', 'LC', 'LD'] }] },
    }

    // tasks, subtasks, sortProperty, sortDirection, searchQuery, labels
    expect(
      displayedTasksSelector.resultFunc(
        tasks,
        subtasks,
        SORT_PROPERTY_TITLE,
        SORT_DIRECTION_DESC,
        'A',
        ['LA', 'LD'],
      ),
    ).toStrictEqual([
      {
        subtasks: {
          items: [
            {
              labels: ['LA', 'LD'],
              title: 'SA3',
            },
          ],
        },
        task: {
          id: 1,
          title: 'D',
        },
      },
    ])
  })
})
