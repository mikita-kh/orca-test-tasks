import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Tag, TextInput } from 'components/atoms'

const boxPad = { horizontal: 'xsmall' }

const TagInput = ({ selectedTags: selectedTagsProp, tags: allTags, onChange, ...rest }) => {
  const [selectedTags, setSelectedTags] = useState(selectedTagsProp)
  const [currentTag, setCurrentTag] = useState('')
  const boxRef = useRef()

  useEffect(() => setSelectedTags(selectedTagsProp), [selectedTagsProp])

  const onSuggestionSelect = useCallback(({ suggestion: t }) => {
    setSelectedTags(tags => tags.concat(t))
    setCurrentTag('')
  }, [])
  const onTextInputChange = useCallback(e => {
    setCurrentTag(e.target.value)
  }, [])
  const onTagRemove = useCallback(
    tag => () => {
      setSelectedTags(tags => tags.filter(t => t !== tag))
    },
    [],
  )
  const tags = useMemo(
    () => allTags.filter(tag => !selectedTags.includes(tag)),
    [allTags, selectedTags],
  )

  useEffect(() => {
    onChange(selectedTags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags])

  return (
    <Box direction="row" align="center" pad={boxPad} border="all" ref={boxRef} wrap {...rest}>
      {selectedTags.map(tag => (
        <Tag
          background="neutral-2"
          margin="xxsmall"
          key={tag}
          onRemove={onTagRemove(tag)}
          value={tag}
        />
      ))}
      <Box flex>
        <TextInput
          type="search"
          plain
          dropTarget={boxRef.current}
          suggestions={tags}
          onChange={onTextInputChange}
          value={currentTag}
          onSuggestionSelect={onSuggestionSelect}
        />
      </Box>
    </Box>
  )
}

TagInput.propTypes = {
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TagInput
