const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const app = express()
const PORT = 3000
const db = require('./models')
const Todo = db.Todo
const User = db.User
const usePassport = require('./config/passport')
const routes = require('./routes')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
  }))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
    // 你可以在這裡 console.log(req.user) 等資訊來觀察
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    next()
  })
  
app.use(routes)





app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})