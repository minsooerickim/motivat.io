import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'

export default function ControlledCheckbox() {
  const [emailChecked, setEmailChecked] = React.useState(true)
  const [textChecked, setTextChecked] = React.useState(true)

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailChecked(event.target.checked)
  }
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextChecked(event.target.checked)
  }

  return (
    <div className="flex justify-center">
      <span className="flex justify-center items-center">
        <Checkbox
          checked={emailChecked}
          onChange={handleEmailChange}
          inputProps={{ 'aria-label': 'controlled' }}
          color="success"
        />
        <p className="inline pr-3">email</p>
      </span>
      <span className="flex justify-center items-center">
        <Checkbox
          checked={textChecked}
          onChange={handleTextChange}
          inputProps={{ 'aria-label': 'controlled' }}
          color="success"
        />
        <p className="inline pr-3">text</p>
      </span>
    </div>
  )
}
