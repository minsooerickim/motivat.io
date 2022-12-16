import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import { getRandomArbitrary } from '@/utility/methods'
import axios from 'axios'

export default function MediaControlCard() {
  const theme = useTheme()
  const [quoteImage, setQuoteImage] = React.useState('')
  const [imageId, setImageId] = React.useState(0)
  const [quote, setQuote] = React.useState('')
  const [quoteAuthor, setQuoteAuthor] = React.useState('')

  const MIN_ID = 0
  const MAX_ID = 1000

  // GETs the quote and sets the according properties
  const getQuote = () => {
    axios
      .get('http://api.quotable.io/random?maxLength=40')
      .then(function (res) {
        setQuote(res.data.content)
        setQuoteAuthor(res.data.author)
        // get random image id and set the image
        const randImageId = getRandomArbitrary(MIN_ID, MAX_ID)
        setImageId(randImageId)
        setQuoteImage('https://picsum.photos/id/' + imageId + '/500')
      })
  }

  const playQuote = () => {
    var msg = new SpeechSynthesisUtterance()

    // different languages
    // var voices = window.speechSynthesis.getVoices();
    // msg.voice = voices[2];

    msg.text = quote + ' by ' + quoteAuthor
    window.speechSynthesis.speak(msg)
  }

  React.useEffect(() => {
    getQuote()
  }, [])

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {quote}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {quoteAuthor}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? (
              <span className="-mt-1" onClick={() => getQuote()}>
                <SkipNextIcon />
              </span>
            ) : (
              <span className="-mt-1" onClick={() => getQuote()}>
                <SkipPreviousIcon />
              </span>
            )}
          </IconButton>
          <span onClick={() => playQuote()}>
            <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
          </span>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? (
              <span className="-mt-1" onClick={() => getQuote()}>
                <SkipPreviousIcon />
              </span>
            ) : (
              <span className="-mt-1" onClick={() => getQuote()}>
                <SkipNextIcon />
              </span>
            )}
          </IconButton>
        </Box>
      </Box>
      <CardMedia component="img" sx={{ width: 151 }} src={quoteImage} />
    </Card>
  )
}
