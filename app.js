const express = require('express')
const app = express()
const router = require('./routes')
const port = 3000
const session = require('express-session')


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
// app.use(router)
app.use(session({
  secret: 'halo',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})