const express = require('express')
const hbs = require('express-handlebars')

const carsService = require('./services/cars')

const { about } = require('./controllers/about')
const create = require('./controllers/create')
const { details } = require('./controllers/details')
const { home } = require('./controllers/home')
const { notFound } = require('./controllers/notFound')
const deleteCar = require('./controllers/delete')
const app = express()



app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine)
//vzimame si engina ot hbs za da go slojim v app
app.set('view engine', 'hbs')
//tova go pravim za da si dobavq samo .hbs na razlichnite render viewta

app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('static'))
app.use(carsService())

app.get('/', home)
app.get('/about', about)
app.get('/create', create.get)
app.post('/create', create.post)
app.get('/details/:id', details)
app.route('/delete/:id').get(deleteCar.get).post(deleteCar.post)

    app.all('*', notFound)
// * vzima vsichki adresi

app.listen(3000, () => console.log('Server started'))