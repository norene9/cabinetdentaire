//consts
const express=require('express')
const app=express()
var routes=require('./routes/general')
const port='8080'
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

