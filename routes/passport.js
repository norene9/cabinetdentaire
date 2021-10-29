var passport = require('passport');
const bcrypt=require('bcrypt')
var localStrategy = require('passport-local').Strategy;
const {Admin} = require('../sequelize');
var express = require('express');
var router = express.Router();

module.exports = function (passport) {
     passport.serializeUser(function (user,done) {
        done(null,user);
     });
     passport.deserializeUser(function (user,done) {
         done(null,user);
     });
     passport.use(new localStrategy( async function (username,password,done) {
       
     console.log(username)
     console.log(password)
      const user= await Admin.findOne({where: {
              username:username
          }});
          if(user!==null){
            if (!bcrypt.compareSync(password, user.password)) {
              console.log('incorrect pwd')
              return done(null, false, { message: "Incorrect password" });
            }
          
        else if(user) {
           console.log(user)
            done( null,user);
           
        } else {
          console.log('not found')
            done(null,false);
        }
          }else{
            console.log('not found')
            done(null,false);
          }
          
     }));
};