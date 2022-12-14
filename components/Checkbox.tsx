import * as React from 'react'
import { pink } from '@mui/material/colors'
import Checkbox from '@mui/material/Checkbox'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

export default function ColorCheckboxes() {
  return (
    <div className="flex justify-center">
      <span className="flex justify-center items-center">
        <Checkbox {...label} defaultChecked />
        <p className="inline pr-3">email</p>
      </span>
      <span className="flex justify-center items-center">
        <Checkbox {...label} defaultChecked color="success" />
        <p className="inline pr-3">text</p>
      </span>
    </div>
  )
}
