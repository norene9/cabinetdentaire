var express= require('express')
var router=express.Router();
const {RendezVous}=require('../sequelize');
const {Time}=require('../sequelize');
const {Admin}=require('../sequelize');
var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const bcrypt=require('bcrypt');
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);
router.use(bodyParser.json())
///---adminlogin----//
//================login Function=================//
var loggedin=function(req,res,next){
    
    if(req.isAuthenticated()){
        console.log('login with sucess') 
        
   next()
  
    }else{
        console.log('opps faile')
      res.redirect('/admin')
    }
  }
  router.get('/login',async function(req,res,next){
    try{
        
     console.log(req.isAuthenticated())
     res.render('login')
    }catch(err){
     next(err)
    }
 }
 
 )
router.get('/appointment',(req,res)=>{
    res.render('appointment')
})
router.get('/admin',async (req,res)=>{
    const admin=await Admin.findOne({where:{username:'Admin'}})
    console.log('admin is '+admin.username)
    if(admin==null){
        var password='admin'
        const hashPass = bcrypt.hashSync(password, salt)
        await Admin.create({username:'admin',password:hashPass})
    }
    res.render('Admin')
})
router.get('/services',(req,res)=>{
    res.render('services')
})
module.exports = router;