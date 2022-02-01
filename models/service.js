const sequelize = require("../sequelize");
module.exports=(sequelize,type)=>{
    return sequelize.define('service',{
        id:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        service:type.STRING,
        pic:type.STRING,
        
    })
   
}