const Accessory = require('../models/Accessory')
const { accesssoryViewModel } = require('./util')



async function getAll(){
    const data= await Accessory.find({})
    return data.map(accesssoryViewModel)
}

async function createAccessory(accessory){
   await Accessory.create(accessory)




}

module.exports = () => (req, res, next) => {
    req.accessory = {
     createAccessory,
     getAll
    }
    next()

}