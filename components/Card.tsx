import { motion } from 'framer-motion'
import * as React from 'react'
import { RxSpeakerLoud } from 'react-icons/rx'
import { BsHeart, BsSave, BsSaveFill } from 'react-icons/bs'
import { GET_CONFIG } from '@/utility/const'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Card() {
  const [saved, setSaved] = React.useState(false)
  const [quote, setQuote] = React.useState('')
  const [quoteAuthor, setQuoteAuthor] = React.useState('')
  const [quoteTag, setQuoteTag] = React.useState('')

  const retrieveDailyQuote = async () => {
    await axios.get('/api/getDailyQuote', GET_CONFIG).then(function (res) {
      setQuote(res.data.dailyQuote[0].quote)
      setQuoteAuthor(res.data.dailyQuote[0].quoteAuthor)
      setQuoteTag(res.data.dailyQuote[0].quoteTag)
    })
  }

  const playQuote = () => {
    const msg = new SpeechSynthesisUtterance()

    // different languages
    // var voices = window.speechSynthesis.getVoices();
    // msg.voice = voices[2];

    msg.text = quote + ' by ' + quoteAuthor
    window.speechSynthesis.speak(msg)
  }

  const toggleSaveQuote = () => {
    setSaved(!saved)
    axios
      .post('/api/toggleSaved', { saved })
      .then(() => {
        toast.success('Successfully subscribed!')
      })
      .catch(() => {
        toast.error('Uh oh. Something went wrong...')
      })
  }

  // get quote on page load
  React.useEffect(() => {
    retrieveDailyQuote()
  }, [])

  return (
    <div className="flex flex-row items-center">
      <div className="card w-80 md:w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {quoteAuthor}
            <div className="badge badge-accent">
              {quoteTag == 'famous-quotes' ? 'famous' : quoteTag}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.995 }}
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => playQuote()}
            >
              <RxSpeakerLoud />
            </motion.button>
          </h2>
          <p>{quote}</p>
          <div className="card-actions justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.995 }}
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => playQuote()}
            >
              <BsHeart />
            </motion.button>
            {saved ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.995 }}
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={() => toggleSaveQuote()}
              >
                <BsSaveFill />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.995 }}
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={() => toggleSaveQuote()}
              >
                <BsSave />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
