import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ECHighlighter from 'react-ec-highlighter'
import {
  Heading,
  Spinner,
  Button,
  Box,
  List,
  CheckBox,
  Tag,
  Accordion,
  AccordionPanel,
} from 'components/atoms'
import { getAllTasks, addTask, removeSubTask } from 'store/slices'
import {
  displayedTasksSelector,
  searchTasksQuerySelector,
  subTasksLabelsSelector,
  tasksLoadingSelector,
} from 'store/selectors'
import SortTasksControl from './SortTasksControl'
import SearchTasksAndSubTasksControl from './SearchTasksAndSubTasksControl'
import FilterTasksAndSubtasksByLabelsControl from './FilterTasksAndSubtasksByLabelsControl'

const boxPad = { horizontal: 'medium' }

const Tasks = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTasks())
  }, [dispatch])

  const addTaskHandler = useCallback(() => dispatch(addTask()), [dispatch])
  const removeSubTaskHandler = useCallback(
    subtask => () => dispatch(removeSubTask(subtask)),
    [dispatch],
  )

  const isLoading = useSelector(tasksLoadingSelector)
  const searchQuery = useSelector(searchTasksQuerySelector)
  const displayedTasks = useSelector(displayedTasksSelector)
  const selectedLabels = useSelector(subTasksLabelsSelector)

  return !isLoading ? (
    <Box pad="medium" alignContent="start" gap="medium">
      <h1>Tasks</h1>
      <Box direction="row" alignContent="center" gap="medium" justify="end">
        <SearchTasksAndSubTasksControl />
        <SortTasksControl />
        <FilterTasksAndSubtasksByLabelsControl />
      </Box>
      <Accordion multiple>
        {displayedTasks.map(({ task: { id, title }, subtasks }) => (
          <AccordionPanel
            key={id}
            background="light-2"
            label={
              <Box pad={boxPad}>
                <Heading level={4}>
                  {searchQuery ? <ECHighlighter searchPhrase={searchQuery} text={title} /> : title}
                </Heading>
              </Box>
            }
          >
            {!!subtasks && !subtasks.isLoading ? (
              <List pad="xsmall" background="light-1" border={false} data={subtasks.items}>
                {subtask => (
                  <Box key={subtask.id} direction="column" gap="xsmall" pad="small" align="start">
                    <CheckBox
                      onChange={removeSubTaskHandler(subtask)}
                      label={
                        searchQuery ? (
                          <ECHighlighter searchPhrase={searchQuery} text={subtask.title} />
                        ) : (
                          subtask.title
                        )
                      }
                    />
                    <Box direction="row" gap="xsmall" pad="none">
                      {subtask.labels.map(label => (
                        <Tag
                          background={selectedLabels.includes(label) ? 'neutral-4' : undefined}
                          size="xsmall"
                          key={label}
                          value={label}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </List>
            ) : (
              <Box pad="medium" background="light-1">
                <Spinner size="small" />
              </Box>
            )}
          </AccordionPanel>
        ))}
      </Accordion>

      <Button primary onClick={addTaskHandler} label="Add Task" />
    </Box>
  ) : (
    <Spinner size="large" />
  )
}

export default Tasks
