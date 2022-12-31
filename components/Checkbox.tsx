import * as React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Button from '@/components/Buttons/Button'
import LoadingButton from '@/components/Buttons/LoadingButton'
import ErrorButton from './Buttons/ErrorButton'

export default function ControlledCheckbox() {
  const [emailChecked, setEmailChecked] = React.useState(false)
  const [textChecked, setTextChecked] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [subscribeButtonClicked, setSubscribeButtonClicked] =
    React.useState(false)
  const [error, setError] = React.useState(false)

  // handling checkboxes
  const handleEmailCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailChecked(event.target.checked)
  }
  const handleTextCheckChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    setSubscribeButtonClicked(!subscribeButtonClicked)
    // TODO:
    if (emailChecked && textChecked) {
      axios
        .post('/api/subscribe', { email, phone })
        .then(() => {
          toast.success('Successfully subscribed!')
          setSubscribeButtonClicked(!subscribeButtonClicked)
        })
        .catch(() => {
          toast.error('Uh oh. Something went wrong...', {
            id: 'appReminderError',
          })
          setError(true)
        })
    } else if (emailChecked) {
      axios
        .post('/api/subscribe', { email })
        .then(() => {
          toast.success('Successfully subscribed!')
          setSubscribeButtonClicked(!subscribeButtonClicked)
        })
        .catch(() => {
          toast.error('Uh oh. Something went wrong...', {
            id: 'appReminderError',
          })
          setError(true)
        })
    } else {
      axios
        .post('/api/subscribe', { phone })
        .then(() => {
          toast.success('Successfully subscribed!')
          setSubscribeButtonClicked(!subscribeButtonClicked)
        })
        .catch(() => {
          toast.error('Uh oh. Something went wrong...', {
            id: 'appReminderError',
          })
          setError(true)
        })
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center">
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text pr-2">Email</span>
            <input
              type="checkbox"
              // checked
              className="checkbox checkbox-accent"
              onChange={handleEmailCheckChange}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text pr-2">Phone</span>
            <input
              type="checkbox"
              // checked
              className="checkbox checkbox-accent"
              onChange={handleTextCheckChange}
            />
          </label>
        </div>
      </div>

      {emailChecked && (
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your email?</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={handleChangeEmail}
          />
        </div>
      )}

      {textChecked && (
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your phone number?</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={handleChangePhone}
          />
        </div>
      )}

      <span className="pt-4">
        {(emailChecked || textChecked) && !subscribeButtonClicked && !error && (
          <Button text={'Subscribe'} handler={handleSubscribe} />
        )}
        {subscribeButtonClicked && !error && (
          <LoadingButton text={'Subscribing'} />
        )}
        {error && <ErrorButton text={'Something went wrong :('} />}
      </span>
    </div>
  )
}
