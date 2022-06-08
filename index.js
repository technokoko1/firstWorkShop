const express = require('express')
const hbs = require('express-handlebars')
const session=require('express-session')

const initDb=require('./models/index')

const carsService = require('./services/cars')
const accessoryService=require('./services/accessory')
const authService=require('./services/auth')

const { about } = require('./controllers/about')
const create = require('./controllers/create')
const { details } = require('./controllers/details')
const { home } = require('./controllers/home')
const { notFound } = require('./controllers/notFound')
const deleteCar = require('./controllers/delete')
const edit=require('./controllers/edit')
const accessory=require('./controllers/accessory')
const attach=require('./controllers/attach')
const {registerGet,registerPost,loginGet,loginPost,logoutGet}=require('./controllers/auth')
const { isLoggedIn } = require('./services/util')

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

app.use(session({
    secret:'my secret',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:'auto'}
}))
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('static'))
app.use(carsService())
app.use(accessoryService())
app.use(authService())

app.get('/', home)
app.get('/about', about)
app.get('/create',isLoggedIn(), create.get)
app.post('/create', isLoggedIn(),create.post)
app.get('/details/:id', details)
app.route('/delete/:id').get(isLoggedIn(),deleteCar.get).post(deleteCar.post)
app.route('/edit/:id').get(isLoggedIn(),edit.get).post(isLoggedIn(),edit.post)
app.route('/accessory').get(accessory.get).post(accessory.post)
app.route('/attach/:id').get(isLoggedIn(),attach.get).post(isLoggedIn(),attach.post)
app.route('/register').get(registerGet).post(registerPost)
app.route('/login').get(loginGet).post(loginPost)
app.get('/logout',logoutGet)

    app.all('*', notFound)
// * vzima vsichki adresi

app.listen(3000, () => console.log('Server started'))
}