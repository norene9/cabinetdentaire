const sequelize = require("../sequelize");
module.exports=(sequelize,type)=>{
    return sequelize.define('latestworks',{
        id:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        content:type.STRING,
        pic:type.STRING,
        title:type.STRING
    })
   
}