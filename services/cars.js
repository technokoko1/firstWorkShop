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

async function getAll(){
    const data = await read()
   return Object
    .entries(data)
    .map(([id,v])=>Object.assign({},{id},v))
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

module.exports=()=>(req,res,next)=>{
    req.storage={
        getAll,
        getById
    }
    next()
}