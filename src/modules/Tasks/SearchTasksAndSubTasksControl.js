import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Form,
  FormField,
  TextInput,
  Box,
  Button,
  DropButton,
  Spinner,
  SearchIcon,
} from 'components/atoms'
import { searchTasksAndSubtasksQuery } from 'store/slices'
import { allSubTasksLoadedSelector, searchTasksQuerySelector } from 'store/selectors'
import { FixedWidthBox } from './DropButtonControl.styles'

const dropAlign = {
  top: 'top',
  right: 'right',
}

const SearchTasksAndSubTasksControl = props => {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const searchQuery = useSelector(searchTasksQuerySelector)
  const allSubTasksLoaded = useSelector(allSubTasksLoadedSelector)

  const [value, setValue] = useState({ searchQuery })

  useEffect(() => setValue({ searchQuery }), [searchQuery])

  const onDropContentOpenHandler = useCallback(() => setOpen(true), [])
  const onDropContentCloseHandler = useCallback(() => {
    setOpen(false)
    setValue({ searchQuery })
  }, [searchQuery])

  const onFormChangeHandler = useCallback(nextValue => setValue(nextValue), [])
  const onFormResetHandler = useCallback(() => {
    dispatch(searchTasksAndSubtasksQuery({ searchQuery: '' }))
    setOpen(false)
  }, [dispatch])
  const onFormSubmitHandler = useCallback(
    formExtendedEvent => {
      dispatch(searchTasksAndSubtasksQuery(formExtendedEvent.value))
      setOpen(false)
    },
    [dispatch],
  )

  return (
    <DropButton
      {...props}
      dropAlign={dropAlign}
      onOpen={onDropContentOpenHandler}
      onClose={onDropContentCloseHandler}
      open={open}
      label={
        <Box direction="row" gap="xsmall">
          <SearchIcon />
          Search by Title
        </Box>
      }
      dropContent={
        <FixedWidthBox direction="column" pad="small" background="light-2">
          {allSubTasksLoaded ? (
            <Form
              value={value}
              onChange={onFormChangeHandler}
              onReset={onFormResetHandler}
              onSubmit={onFormSubmitHandler}
            >
              <Box direction="column" gap="small">
                <FormField name="searchQuery" htmlFor="searchQuery">
                  <TextInput id="searchQuery" name="searchQuery" />
                </FormField>
                <Box direction="row" gap="medium">
                  <Button type="reset" label="Reset" />
                  <Button type="submit" primary label="Search" />
                </Box>
              </Box>
            </Form>
          ) : (
            <Spinner size="small" />
          )}
        </FixedWidthBox>
      }
    />
  )
}

export default SearchTasksAndSubTasksControl
