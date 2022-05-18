const express = require('express')
const hbs = require('express-handlebars')
const { home } = require('./controllers/home')

const app = express()

app.engine('hbs',hbs.create({
    extname:'.hbs'
}).engine)
//vzimame si engina ot hbs za da go slojim v app
app.set('view engine','hbs')
//tova go pravim za da si dobavq samo .hbs na razlichnite render viewta

app.use(express.urlencoded({extended:true}))
app.use('/static', express.static('static'))

app.get('/',home)

app.listen(3000, () => console.log('Server started'))