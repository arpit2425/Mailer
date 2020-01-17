const nodemailer = require('nodemailer')
const nmt = require('nodemailer-mailgun-transport')
const keys = require('./keys')
const auth = {
  auth: {
    api_key: keys.api_key,
    domain: keys.domain
  }
}
const transport = nodemailer.createTransport(nmt(auth))
const sendmail = function (from, subject, text, cb) {
  const mailoption = {
    from,
    to: 'arpittrivedi2425@gmail.com',
    subject,
    text
  }

  transport.sendMail(mailoption, (err, data) => {
    if (err) cb(err, null)
    else cb(null, data)
  })
}

module.exports = sendmail
