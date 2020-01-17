const express = require('express')
const app = express()
const sendmail = require('./mail')
const path = require('path')
const log = console.log
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.post('/email', (req, res) => {
  const { email, subject, text } = req.body
  sendmail(email, subject, text, function (err, data) {
    if (err) {
      res.status(501).json({
        message: 'Error!! Unable to send mail'
      })
    } else {
      res.status(200).json({ status: 'Success', message: 'Mail sent' })
    }
  })
})
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`)
})
app.get('/email/sent', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'sent.html'))
})
app.get('/error', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'fail.html'))
})

app.listen(8000, () => log('Server started'))
