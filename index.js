const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const validationMiddleware = (req, res, next) => {
  if (req.query.age === '' || req.query.age === undefined) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  req.body.age >= 18
    ? res.redirect(`/major?age=${req.body.age}`)
    : res.redirect(`/minor?age=${req.body.age}`)
})

app.get('/major', validationMiddleware, (req, res) => {
  const { age } = req.query

  return res.render('major', { age })
})

app.get('/minor', validationMiddleware, (req, res) => {
  const { age } = req.query

  return res.render('minor', { age })
})

app.listen(3000)
