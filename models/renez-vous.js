const sequelize=require('../sequelize')
module.exports=(sequelize,type)=>{
    return sequelize.define('rendezvous',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nom:type.STRING,
        Prenom:type.STRING,
        numero:type.STRING,
        date:type.DATEONLY,
        hour:type.STRING
    })
}