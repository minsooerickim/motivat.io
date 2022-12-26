import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import axios from 'axios'
import { Box, TextField } from '@mui/material'
import { toast } from 'react-hot-toast'

export default function ControlledCheckbox() {
  const [emailChecked, setEmailChecked] = React.useState(true)
  const [textChecked, setTextChecked] = React.useState(true)
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')

  // handling checkboxes
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailChecked(event.target.checked)
  }
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextChecked(event.target.checked)
  }
  // handling input changes for email and phone
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangePhone = (e) => {
    setPhone(e.target.value)
  }

  // handling when user clicks subscribe
  // TODO: add input validation (yup?)
  const handleSubscribe = () => {
    // TODO:
    if (emailChecked && textChecked) {
      axios
        .post('/api/subscribe', { email, phone })
        .then(() => {
          toast.success('Successfully subscribed!')
        })
        .catch(() => {
          toast.error('Uh oh. Something went wrong...', {
            id: 'appReminderError',
          })
        })
    } else if (emailChecked) {
      axios
        .post('/api/subscribe', { email })
        .then(() => {
          toast.success('Successfully subscribed!')
        })
        .catch(() => {
          toast.error('Uh oh. Something went wrong...', {
            id: 'appReminderError',
          })
        })
    } else {
      axios
        .post('/api/subscribe', { phone })
        .then(() => {
          toast.success('Successfully subscribed!')
        })
        .catch(() => {
          toast.error('Uh oh. Something went wrong...', {
            id: 'appReminderError',
          })
        })
    }
  }

  // https://smartdevpreneur.com/the-complete-guide-to-mui-button-color/
  const styles = {
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'green',
      },
      '&:hover fieldset': {
        borderColor: 'green',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
      color: 'white'
    },
    '& .MuiFormLabel-root': {
      color: 'green'
    }
  }

  return (
    <div className="flex flex-col items-center">
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

      {emailChecked && (
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            color="success"
            onChange={handleChangeEmail}
            sx={styles}
          />
        </Box>
      )}
      {textChecked && (
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            borderColor: 'success',
          }}
          noValidate
          autoComplete="off"
          borderColor="success"
        >
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            color="success"
            onChange={handleChangePhone}
            sx={styles}
            // sx={{ input: { color: 'common.white' } }}
          />
        </Box>
      )}
      {(emailChecked || textChecked) && (
        <div className="pt-2">
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              onClick={handleSubscribe}
              color="success"
              sx={{
                color: 'success.main',
                '&.MuiButton-root': {
                  border: '2px success.main',
                },
              }}
            >
              Subscribe
            </Button>
          </Stack>
        </div>
      )}
    </div>
  )
}
