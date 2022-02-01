var express= require('express')
const multer=require('multer')
const path = require('path');
const connectFlash = require("connect-flash");
var router=express.Router();
const {RendezVous}=require('../sequelize');
const {Time}=require('../sequelize');
const {Admin}=require('../sequelize');
const {LW}=require('../sequelize');
const {working}=require('../sequelize')
const {Service}=require('../sequelize')
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
   //set storage engine
const storage=multer.diskStorage({
    destination:'./upload',
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
var i18n=require("i18n-express");
const { arch } = require('os');


    
    router.use(i18n({
        translationsPath: path.join(__dirname, '../locales'),
        defaultLang: 'ar',
     // <--- use here. Specify translations files path.
        siteLangs: ["ar","fr"],
        textsVarName: 'translation'
      }));
      router.get('/logout',function(req,res){
        req.logOut();
        res.redirect('admin');
      })
    
//upload image
const upload=multer({
    storage:storage
}).single('image')
//gettin page
router.get('/',async(req,res)=>{
    const works=await LW.findAll();
    const services=await Service.findAll();
    const time=await working.findOne();
    res.render('./userside/home',{works,services,time})
})
router.post('/addlatest',async(req,res,next)=>{
    upload(req,res,async(err)=>{
        if(err){
            res.render('/Adminside/addcontent',{
                msg:err
            })
           
        }else{
            console.log(req.file)
            try{
                var content=req.body.content;
                var title=req.body.title
                var pic=req.file
                await LW.create({content:content,pic:pic.filename,title:title})
                res.redirect('latestadminside')
            }catch(err){
                next(err)
            }
        }
    })
})
router.post('/worktime',async(req,res,next)=>{
    upload(req,res,async(err)=>{
        if(err){
            res.render('addcontent',{
                msg:err
            })
           
        }else{
            console.log(req.file)
            try{
                var days=req.body.days;
                var hours=req.body.hours
                var pic=req.file
                await working.destroy({where:{}})
                await working.create({days:days,hours:hours})
                res.redirect('addcontent')
            }catch(err){
                next(err)
            }
        }
    })
})
router.post('/addservice',async(req,res,next)=>{
    upload(req,res,async(err)=>{
        if(err){
            res.render('addcontent',{
                msg:err
            })
           
        }else{
            console.log(req.file)
            try{
                var service=req.body.service;
                
                var pic=req.file
                await Service.create({service:service,pic:pic.filename})
                res.redirect('addcontent')
            }catch(err){
                next(err)
            }
        }
    })
})
router.get('/latestadminside',async(req,res,next)=>{
    const works=await LW.findAll();
    res.render('./Adminside/latestadminside',{works})
})
router.get('/services',async(req,res,next)=>{
    const services=await Service.findAll();
    res.render('./Adminside/services',{services})
})
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
      res.render('./Adminside/dashboard')
  })
  router.get('/newapp',async (req,res)=>{
      
      const rendev=await RendezVous.findAll();
      res.render('./Adminside/newapp',{rendev})
  })
  router.get('/confirmedapp',async (req,res)=>{
      
    const rendev=await RendezVous.findAll({where:{status:'confirmed'}});
    res.render('./Adminside/confirmedapp',{rendev})
})
router.get('/blog',async(req,res)=>{
res.render('./userside/blog')
})
//-------Admin-----------//
router.get('/edit',async(req,res)=>{
    res.render('edit')
    })
    router.post('/AjouterBlog',loggedin,async (req,res,next)=>{
        upload(req,res,async(err)=>{
            if(err){
                res.render('/edit', {
                  msg: err
                });}else{
                    console.log(req.file);
                   
                    try{ 
                        
                        
                        var filepath=req.file;
                        
                        var des=req.body.des;
                        
                        
                        //create product
                        await Mobile.create({des:des,filepath:filepath.filename})
                   res.redirect("add-product")
                    }catch(err){next(err)}
                }
        })
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
      res.redirect('thanks')
      })
   

  })
  router.get('/thanks',async function(req,res){
     
      res.render('./userside/thanks')
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
    await RendezVous.destroy({where:{id:req.params.id}}).then( async function(){
        console.log('destroyed')
        res.redirect('/newapp')
    }
        
    )
   
})
router.get('/addcontent',loggedin,(req,res)=>{
    res.render('./Adminside/addcontent')
})
router.get('/deletcontent/:id',async(req,res)=>{
    console.log(req.params.id)
      await LW.destroy({where:{id:req.params.id}}).then( async function(){
          console.log('destroyed')
          res.redirect('/latestadminside')
      }
          
      )
     
  })
  router.get('/deletservice/:id',async(req,res)=>{
    console.log(req.params.id)
      await Service.destroy({where:{id:req.params.id}}).then( async function(){
          console.log('destroyed')
          res.redirect('/services')
      }
          
      )
     
  })
  router.get('/singleblog/:id',async(req,res)=>{
    
      const post=await LW.findOne({where:{id:req.params.id}})
          
          res.render('./userside/singleblog',{post})
      
          
      
     
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
    const time=await working.findAll()
    if(time.length==0){
        var hours='08:00-12:00/13:00-16:00'
        const days = 'dimanche-jeudi/الاحد-الخميس'
        await working.create({days:days,hours:hours})
    }else{
        console.log(time)
    }
    res.render('./Adminside/Admin')
})
router.get('/services',(req,res)=>{
    res.render('services')
})
module.exports = router;