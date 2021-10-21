var express= require('express')
var router=express.Router();
router.get('/appointment',(req,res)=>{
    res.render('appointment')
})
router.get('/services',(req,res)=>{
    res.render('services')
})
module.exports = router;