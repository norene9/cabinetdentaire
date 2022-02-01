const sequelize = require("../sequelize");
module.exports=(sequelize,type)=>{
    return sequelize.define('workingtime',{
        id:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        days:type.STRING,
        hours:type.STRING,
        
    })
   
}