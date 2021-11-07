var express= require('express')

const connectFlash = require("connect-flash");
var router=express.Router();
const {RendezVous}=require('../sequelize');
const {Time}=require('../sequelize');
const {Admin}=require('../sequelize');
var bodyParser=require('body-parser');
const dialog=require('dialog')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const bcrypt=require('bcrypt');
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);
router.use(bodyParser.json())
router.use(connectFlash());
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
   });
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
  router.get('/dashboard',async(req,res)=>{
      res.render('dashboard')
  })
  router.get('/newapp',async (req,res)=>{
      
      const rendev=await RendezVous.findAll();
      res.render('newapp',{rendev})
  })
  router.get('/confirmedapp',async (req,res)=>{
      
    const rendev=await RendezVous.findAll({where:{status:'confirmed'}});
    res.render('confirmedapp',{rendev})
})
  router.post('/Addapp',async(req,res)=>{
    const nom=req.body.nom;
    console.log('nom cest'+nom)
    const prenom=req.body.prenom;
    const num=req.body.num;const date=req.body.date;
    const service=req.body.service
    RendezVous.create({nom:nom,Prenom:prenom,numero:num,date:date,hour:'/',service:service,status:'waiting'}).then(async function(){
      const msg='تم الحجز بنجاح سيتم الاتصال بك في أقرب وقت'
      req.flash(
        "success",
        msg
      );
      res.redirect('/appointment')
      })
   

  })
  router.get('/thanks',async function(req,res){
     
      res.render('thanks')
  })
  router.get('/modification/:id',async function(req,res){
    const info=await RendezVous.findOne({where:{id:req.params.id}})
    res.render('modification',{info})
})

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
router.get('/delete/:id',async(req,res)=>{
  console.log(req.params.id)
    await RendezVous.destroy({where:{id:req.params.id}})
    console.log('destroyed')
    res.redirect('newapp')
})
router.get('/deleteconf/:id',async(req,res)=>{
    console.log(req.params.id)
      await RendezVous.destroy({where:{id:req.params.id}})
      console.log('destroyed')
      res.redirect('confirmedapp')
  })
router.post('/confirm',async(req,res,next)=>{
    try{
await RendezVous.update({hour:req.body.hour,status:'confirmed'},{where:{id:req.body.id}})
res.redirect('newapp')
    }catch(err){
next(err)
    }
    
   
})
router.post('/modificationconfirmed',async(req,res,next)=>{
    try{
await RendezVous.update({hour:req.body.hour,service:req.body.service,numero:req.body.num,nom:req.body.nom,Prenom:req.body.prenom,date:req.body.date,status:'confirmed'},{where:{id:req.body.id}})
res.redirect('newapp')
    }catch(err){
next(err)
    }
    
   
})
router.get('/admin',async (req,res)=>{
    const admin=await Admin.findOne({where:{username:'Admin'}})
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