const express = require('express')
const hbs = require('express-handlebars')

const initDb=require('./models/index')

const carsService = require('./services/cars')
const accessoryService=require('./services/accessory')

const { about } = require('./controllers/about')
const create = require('./controllers/create')
const { details } = require('./controllers/details')
const { home } = require('./controllers/home')
const { notFound } = require('./controllers/notFound')
const deleteCar = require('./controllers/delete')
const edit=require('./controllers/edit')
const accessory=require('./controllers/accessory')
const attach=require('./controllers/attach')

const app = express()

start()

async function start(){

    await initDb()

app.engine('hbs', hbs.create({
    extname: '.hbs'
}).engine)
//vzimame si engina ot hbs za da go slojim v app
app.set('view engine', 'hbs')
//tova go pravim za da si dobavq samo .hbs na razlichnite render viewta

app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('static'))
app.use(carsService())
app.use(accessoryService())

app.get('/', home)
app.get('/about', about)
app.get('/create', create.get)
app.post('/create', create.post)
app.get('/details/:id', details)
app.route('/delete/:id').get(deleteCar.get).post(deleteCar.post)
app.route('/edit/:id').get(edit.get).post(edit.post)
app.route('/accessory').get(accessory.get).post(accessory.post)
app.route('/attach/:id').get(attach.get).post(attach.post)
    app.all('*', notFound)
// * vzima vsichki adresi

app.listen(3000, () => console.log('Server started'))
}