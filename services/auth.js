const User=require('../models/user')

async function register(session, username,password){
    const user = new User({
        username,
        hashedPassword:password
    })
  await user.save()
  session.user={
      id:user._id,
      username:user.username
  }
}

async function login(session, username,password){
    const user = await User.findOne({username})
    if(user&& await user.comparePassword(password)){
        session.user={
            id:user._id,
            username:user.username
        }
        return true
        
    }else{
        throw new Error('incorect user or password')
    }
}
 
 function logout (session){
    delete session.user

}

module.exports=()=>(req,res,next)=>{
    if(req.session.user){
        res.locals.user=req.session.user
        //slagame sesiqta v responsa
        res.locals.hasUser=true
        //buleva funkciq za da si ulesnim templeitite

    }
   req.auth={
       register:(...params)=>register(req.session,...params) ,
       login:(...params)=>login(req.session,...params) ,
       //slagame sessiqta na login i register
       // pishem imeto i parolata kato params zashtoto moje v budeshte
       //da iskame da dobavim oshte danni
       logout:()=>logout(req.session)
   }
    next()
}