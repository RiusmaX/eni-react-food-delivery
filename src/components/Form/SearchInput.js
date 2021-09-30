import { Search } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'

function SearchInput ({ onChange }) {
  const [searchText, setSearchText] = useState('')

  const handleChange = (e) => {
    setSearchText(e.target.value)
    onChange(e.target.value)
  }

  return (
    <TextField
      name='searchText'
      onChange={handleChange}
      value={searchText}
      style={{ margin: 25, zIndex: 0 }}
      label='Rechercher'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Search />
          </InputAdornment>
        )
      }}
    />
  )
}

export default SearchInput
