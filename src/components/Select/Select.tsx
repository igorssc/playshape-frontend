import {
  InputLabel,
  MenuItem,
  Select as SelectElement
} from '@material-ui/core'
import React, { ChangeEvent } from 'react'
import { Container } from './Select.style'

interface SelectProps {
  value: string
  items: string[]
  onChange: (
    e: ChangeEvent<{
      name?: string
      value: unknown
    }>
  ) => any
  label: string
  disabled?: boolean
}

export const Select = ({
  value,
  items,
  onChange,
  label,
  disabled
}: SelectProps) => {
  return (
    <Container>
      <InputLabel id="size-select-label">{label}</InputLabel>
      <SelectElement
        labelId="size-select-label"
        onChange={onChange}
        disabled={disabled ?? false}
        value={value}
      >
        {items.map(item => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          )
        })}
      </SelectElement>
    </Container>
  )
}
