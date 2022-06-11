const {Schema ,model, Types:{ObjectId}}= require('mongoose')


const carSchema = new Schema({
    name:{type :String,required:[true,'listing name is required']},
    description:{type :String,default:''} ,
    imageUrl:{type :String, default:'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'} ,
    price:{type :Number,required:true,min:0},
    accessories:{type:[ObjectId],default:[],ref:'Accessory'},
    owner:{type:ObjectId,ref: 'User'}
})
//suzdavame shemata

//model funkciqta idva ot mongoose
const Car = model('Car',carSchema)

//prevrushtame shemata v model

module.exports=Car