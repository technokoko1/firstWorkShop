const bcrypt = require('bcrypt')

function accesssoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        price: accessory.price
    }
    //opravqme dannite koito idvat ot mongoose da sa obekt
    //samo che tuk za aksesuarite
}

function carViewModel(car) {
    const model = {
        id: car._id,
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        accessories: car.accessories
    }
    if (model.accessories.length > 0 && model.accessories[0].name) {
        //proverqvame dali ima ime za da znaem dali da go mappnem
        model.accessories = model.accessories.map(accesssoryViewModel)
    }

    return model
    //opravqme dannite koito idvat ot mongoose da sa obekt
}

async function hashPassword(password) {
    return bcrypt.hash(password, 10)

}

async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
}

module.exports = {
    accesssoryViewModel,
    carViewModel,
    hashPassword,
    comparePassword
}