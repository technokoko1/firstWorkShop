const fs=require('fs/promises')
const { version } = require('process')

const filePath='./services/data.json'
async function read(){
    try{

    
const file=await fs.readFile(filePath)
return JSON.parse(file)
}catch (err){
    console.error('Database read error')
    console.error(err)
    process.exit(1)

}
}
//chete dannite 

async function write(data){
   
    try{
     await fs.writeFile(filePath,JSON.stringify(data))
    }catch(err){
        console.error('Database read error')
        console.error(err)
        process.exit(1)
    
    }
}
//zapisva novi danni


async function createCar(car){

    const cars= await read()
 let id;

 do{
     id = nextId()
 }while(car.hasOwnProperty(id))

 cars[id] = car
 
 await  write(cars)
}
//suzdavame nova kola

function nextId(){
    return 'xxxxxxxx-xxxx'.replace(/x/g,()=>(Math.random()*16|0).toString(16))
}
//pravim random id za suzdadena kola

async function getAll(query){
    const data = await read()
  let cars= Object
    .entries(data)
    .map(([id,v])=>Object.assign({},{id},v))

    if(query.search){
        cars= cars.filter(c=>c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()))
    }
    if(query.from){
        cars=cars.filter(c=>c.price>=Number(query.from))
    }

    if(query.to){
        cars=cars.filter(c=>c.price<=Number(query.to))
    }
    return cars
    //vzimame vsichki koli za da gi slojim na nachalnata stranica
}

async function getById(id){
    const data= await read()

    const car=data[id]
    if(car){

    
    return Object.assign({},{id},car)
    }else{
        return undefined
    }
    //vzimame 1 kola za da si vidim descriptiona po id
}

async function deleteById(id){
    const data= await read()

   
    if(data.hasOwnProperty(id)){
   delete data[id]
   await write(data)
    }else{
       throw new Error ('No such ID in database')
    }
    //vzimame 1 kola za da si vidim descriptiona po id
}

module.exports=()=>(req,res,next)=>{
    req.storage={
        getAll,
        getById,
        createCar,
        deleteById
    }
    next()
}