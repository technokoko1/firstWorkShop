const fs = require('fs/promises')
const { version } = require('process')
const Car = require('../models/Car')
const { carViewModel } = require('./util')


const filePath = './services/data.json'


async function createCar(car) {
    const result = new Car(car)
    await result.save()
   
}
//suzdavame nova kola






async function getAll(query) {
    const options = {}

    if (query.search) {
        options.name = new RegExp(query.search, 'i')
    }
    if (query.from) {
        options.price = { $gte: Number(query.from) }
    }

    if (query.to) {
        if (!options.price) {
            options.price = {}
        } 
        options.price.$lte=Number(query.to)
    }
   

    const cars = await Car.find(options)
    return cars.map(carViewModel)
 
    //vzimame vsichki koli za da gi slojim na nachalnata stranica
    //sushto ima i vgradeno tursene 
}

async function getById(id) {

    const car = await Car.findById(id).populate('accessories','')
    //populate pravi aksesuarite da sa realni danni 
    //ne samo idta
    if (car) {
        return carViewModel(car)
    } else {
        return undefined
    }
    
    //vzimame 1 kola za da si vidim descriptiona po id
}

async function deleteById(id,ownerId) {
    const existing=await Car.findById(id)
    if(existing.owner!=ownerId){
        return false
    }
  await  Car.findByIdAndDelete(id)
  return true

  //vzimame 1 kola i q triem po id
}

async function updateById(id, car,ownerId) {
//    await Car.findByIdAndUpdate(id,car)
     const existing=await Car.findById(id)

     if(existing.owner!=ownerId){
         return false
     }
     existing.name=car.name
     existing.description=car.description
     existing.imageUrl=car.imageUrl ||undefined
     existing.price=car.price
     existing.accessories=car.accessories
     await existing.save()
    //vzimame 1 kola i q editvame po id
    return true
}

async function attachAccessory(carId,accessoryId,ownerId){
    const existing=await Car.findById(carId)

    if(existing.owner!=ownerId){
        return false
    }

    existing.accessories.push(accessoryId)

    await existing.save()
    return true
}
//zakachame aksesual za kola

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        deleteById,
        updateById,
        attachAccessory
    }
    next()
}