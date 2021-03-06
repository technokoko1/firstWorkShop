//kontrolira autorizaciqta za saita

const { validationResult } = require("express-validator")
const { redirect } = require("express/lib/response")

module.exports = {
    registerGet(req, res) {
        res.render('register', {title: 'Register'})

    },
    async registerPost(req, res) {
       const {errors}= validationResult(req)
   
        try {
            if(errors.length>0){
                throw errors
            }
            await req.auth.register(req.body.username, req.body.password)
            res.redirect('/')
        } catch (errors) {
            console.error(errors)
            res.render('register', {title: 'Register',errors,data:{username:req.body.user}})
        }


    },
    loginGet(req, res) {
        res.render('login', { title: 'Login' })

    },
    async loginPost(req, res) {
        try{
            await req.auth.login(req.body.username, req.body.password)
            res.redirect('/')
        }catch(err){
            console.error(err)
            res.redirect('/login')
        }

    },
    logoutGet(req, res) {
          req.auth.logout()
           res.redirect('/')
    },

}