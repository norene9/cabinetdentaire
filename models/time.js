const sequelize = require("../sequelize");
module.exports=(sequelize,type)=>{
    return sequelize.define('time',{
        id:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        time:type.STRING,
        libre:type.BOOLEAN
    })
   
}