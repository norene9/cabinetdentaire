const sequelize = require("../sequelize");
module.exports=(sequelize,type)=>{
    return sequelize.define('Admin',{
        id:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        username:type.STRING,
        password:type.STRING
    })
   
}