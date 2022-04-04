import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DropButton,
  Select,
  Box,
  Button,
  SortIcon,
  AscendIcon,
  DescendIcon,
} from 'components/atoms'
import {
  SORT_PROPERTY_CREATE_TIME,
  SORT_PROPERTY_TITLE,
  SORT_DIRECTION_ASC,
  SORT_DIRECTION_DESC,
  sortTasks,
} from 'store/slices'
import { sortTaskPropertySelector, sortTaskDirectionSelector } from 'store/selectors'
import { FixedWidthBox } from './DropButtonControl.styles'

const OPTIONS = [SORT_PROPERTY_TITLE, SORT_PROPERTY_CREATE_TIME]

const dropAlign = {
  top: 'top',
  right: 'right',
}

const SortTasksControl = props => {
  const dispatch = useDispatch()
  const storedSortProperty = useSelector(sortTaskPropertySelector)
  const storedSortDirection = useSelector(sortTaskDirectionSelector)

  const [open, setOpen] = useState(false)
  const [sortProperty, setSortProperty] = useState(storedSortProperty)
  const [sortDirection, setSortDirection] = useState(storedSortDirection)

  useEffect(() => setSortProperty(storedSortProperty), [storedSortProperty])
  useEffect(() => setSortDirection(storedSortDirection), [storedSortDirection])

  const onChangeSortPropertyHandler = useCallback(({ option }) => setSortProperty(option), [])
  const onChangeSortDirectionHandler = useCallback(dir => () => setSortDirection(dir), [])

  const onDropContentOpenHandler = useCallback(() => setOpen(true), [])
  const onDropContentCloseHandler = useCallback(() => {
    setSortDirection(storedSortDirection)
    setSortProperty(storedSortProperty)
    setOpen(false)
  }, [storedSortDirection, storedSortProperty])
  const applySortHandler = useCallback(() => {
    dispatch(
      sortTasks({
        sortProperty,
        sortDirection,
      }),
    )

    setOpen(false)
  }, [dispatch, sortDirection, sortProperty])
  const resetSortHandler = useCallback(() => {
    dispatch(
      sortTasks({
        sortProperty: SORT_PROPERTY_CREATE_TIME,
        sortDirection: SORT_DIRECTION_ASC,
      }),
    )

    setOpen(false)
  }, [dispatch])

  return (
    <DropButton
      {...props}
      open={open}
      dropAlign={dropAlign}
      label={
        <Box direction="row" gap="xsmall">
          <SortIcon />
          Sort By
        </Box>
      }
      dropContent={
        <FixedWidthBox direction="column" pad="small" gap="medium" background="light-2">
          <Box direction="row" gap="medium">
            <Select value={sortProperty} options={OPTIONS} onChange={onChangeSortPropertyHandler} />
            <Box direction="row" gap="xxsmall">
              <Button
                icon={<AscendIcon />}
                secondary
                active={sortDirection === SORT_DIRECTION_ASC}
                onClick={onChangeSortDirectionHandler(SORT_DIRECTION_ASC)}
              />
              <Button
                icon={<DescendIcon />}
                secondary
                active={sortDirection === SORT_DIRECTION_DESC}
                onClick={onChangeSortDirectionHandler(SORT_DIRECTION_DESC)}
              />
            </Box>
          </Box>
          <Box direction="row" gap="medium">
            <Button label="Reset" onClick={resetSortHandler} />
            <Button primary label="Apply" onClick={applySortHandler} />
          </Box>
        </FixedWidthBox>
      }
      onOpen={onDropContentOpenHandler}
      onClose={onDropContentCloseHandler}
    />
  )
}

export default SortTasksControl
