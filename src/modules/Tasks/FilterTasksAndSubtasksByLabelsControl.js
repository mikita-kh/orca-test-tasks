import { useDispatch, useSelector } from 'react-redux'
import React, { useCallback, useEffect, useState } from 'react'
import { allSubTasksLoadedSelector, subTasksLabelsSelector } from 'store/selectors'
import { filterTasksAndSubtasksByLabels } from 'store/slices'
import { DropButton, Spinner, Box, Button, TagInput, FilterIcon } from 'components/atoms'
import { labels } from 'api/config'
import { FixedWidthBox } from './DropButtonControl.styles'

const dropAlign = {
  top: 'top',
  right: 'right',
}

const FilterTasksAndSubtasksByLabelsControl = (...props) => {
  const dispatch = useDispatch()
  const selectedLabels = useSelector(subTasksLabelsSelector)
  const allSubTasksLoaded = useSelector(allSubTasksLoadedSelector)

  const [open, setOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState(selectedLabels)

  useEffect(() => setSelectedTags(selectedLabels), [selectedLabels])

  const onDropContentOpenHandler = useCallback(() => setOpen(true), [])
  const onDropContentCloseHandler = useCallback(() => {
    setSelectedTags(selectedLabels)
    setOpen(false)
  }, [selectedLabels])

  const onTagInputChangeHandler = useCallback(nextSelectedTags => {
    // dispatch(filterTasksAndSubtasksByLabels({ labels: nextSelectedTags }))
    setSelectedTags(nextSelectedTags)
  }, [])

  const applyFilterByLabelsHandler = useCallback(() => {
    dispatch(filterTasksAndSubtasksByLabels({ labels: selectedTags }))
    setOpen(false)
  }, [dispatch, selectedTags])
  const resetFilterByLabelsHandler = useCallback(() => {
    dispatch(filterTasksAndSubtasksByLabels({ labels: [] }))
    setOpen(false)
  }, [dispatch])

  return (
    <DropButton
      {...props}
      open={open}
      label={
        <Box direction="row" gap="xsmall">
          <FilterIcon />
          Filter By Labels
        </Box>
      }
      dropAlign={dropAlign}
      dropContent={
        <FixedWidthBox
          direction="column"
          pad="small"
          background="light-2"
          alignContent="stretch"
          justify="stretch"
        >
          {allSubTasksLoaded ? (
            <Box fill="vertical" gap="medium">
              <TagInput
                flex
                selectedTags={selectedTags}
                tags={labels}
                onChange={onTagInputChangeHandler}
              />
              <Box direction="row" gap="medium" justify="end">
                <Button label="Reset" onClick={resetFilterByLabelsHandler} />
                <Button primary label="Apply" onClick={applyFilterByLabelsHandler} />
              </Box>
            </Box>
          ) : (
            <Spinner size="small" />
          )}
        </FixedWidthBox>
      }
      onOpen={onDropContentOpenHandler}
      onClose={onDropContentCloseHandler}
    />
  )
}

export default FilterTasksAndSubtasksByLabelsControl
