import { motion } from 'framer-motion'
import * as React from 'react'
import { RxSpeakerLoud } from 'react-icons/rx'
import { BsHeart, BsSave } from 'react-icons/bs'
import { GET_CONFIG } from '@/utility/const'
import axios from 'axios'

export default function Card() {
  const [quote, setQuote] = React.useState('')
  const [quoteAuthor, setQuoteAuthor] = React.useState('')
  const [quoteTag, setQuoteTag] = React.useState('')

  // GETs the quote and sets the according properties
  const getQuote = async () => {
    await axios
      .get('https://api.quotable.io/random?maxLength=200', GET_CONFIG)
      .then(function (res) {
        setQuote(res.data.content)
        setQuoteAuthor(res.data.author)
        setQuoteTag(res.data.tags[0])
      })
  }
  const registerQuote = async () => {
    await axios.post('/api/registerQuote', { quote, quoteAuthor, quoteTag })
  }

  const playQuote = () => {
    const msg = new SpeechSynthesisUtterance()

    // different languages
    // var voices = window.speechSynthesis.getVoices();
    // msg.voice = voices[2];

    msg.text = quote + ' by ' + quoteAuthor
    window.speechSynthesis.speak(msg)
  }

  // get quote on page load
  React.useEffect(() => {
    getQuote()
  }, [])

  React.useEffect(() => {
    if (quote != '') {
      registerQuote()
    }
  }, [quote, quoteAuthor, quoteTag, registerQuote])

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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.995 }}
              className="flex flex-col justify-center items-center cursor-pointer"
              onClick={() => playQuote()}
            >
              <BsSave />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
