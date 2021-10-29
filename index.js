//consts
const express=require('express')
const app=express()
var session=require('express-session')
var Passport=require('passport').Passport, passport=new Passport();
app.use(session({secret: "-- ENTER CUSTOM SESSION SECRET --"}));
app.use(passport.initialize());
app.use(passport.session())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({secret: "secret"}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: true}))
var authRoutes=require("./routes/auth")(passport)
require("./routes/passport")(passport)
app.use('/',authRoutes)
var routes=require('./routes/general')
var Passport=require('passport').Passport, passport=new Passport();
var userRouter=require('./routes/passport')
app.use('/passport',userRouter);
const port='8060'
//seting view
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use('/',routes)
//gettin page
app.get('/',(req,res)=>{
    res.render('home')
})
//server
app.listen(port,console.log('app running at '+port)) 

