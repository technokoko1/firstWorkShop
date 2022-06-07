const {Schema,model}=require('mongoose')
const {hashPassword ,comparePassword}=require('../services/util')

const userSchema=new Schema({
    username:{type:String,required:true,minlength:3,unique:true},
    hashedPassword:{type:String,required:true,minlength:3}
})

userSchema.methods.comparePassword= async function(password){
    //polzvame bcrypt da hashirame parolata i da q sruvnim sus zapazenite
    return await comparePassword(password,this.hashedPassword)
}

 userSchema.pre('save',async function(next){
    if( this.isModified('hashedPassword')){
        //isModified e metod ot mongoose
        //proverqvame dali parolata e smenena za da q heshirame
        //ako ne e smenena ne vlizame tuk za da ne q heshirame vtori put
        this.hashedPassword=await hashPassword(this.hashedPassword)
    }
    

    next()
})
const User=model('User',userSchema)

module.exports=User