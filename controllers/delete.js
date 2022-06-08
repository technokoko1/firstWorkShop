

module.exports = {
    async get(req, res) {

        const id = req.params.id
        const car = await req.storage.getById(id)
         
        if(car.owner!=req.session.user.id){
            console.log('not owner')
           return res.redirect('/login')
        }

        if (car) {
            res.render('delete', { title: `Delete Listing ${car.name}`, car })
        } else {
            res.redirect('404')
        }

    },
    async post(req, res) {
        const id = req.params.id

        try {
            if(await req.storage.deleteById(id,req.session.user.id)){
                res.redirect('/')
            }else{
                res.redirect('/login')
            }
            
        } catch (err) {
            res.redirect('404')
        }
    }
}