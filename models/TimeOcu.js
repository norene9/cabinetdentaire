const sequelize=require('../sequelize');
module.exports=(sequelize,type)=>{
return sequelize.define('timeocu',{
    id:{
        type:type.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    dateoc:type.DATEONLY,
    timeoc:type.STRING
})
}