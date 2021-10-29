const Sequelize=require('sequelize');
const TimeOcuModel=require('./models/TimeOcu');
const TypeTimeModel=require('./models/time');
const TypeRendezVousModel=require('./models/renez-vous');
const AdminModel=require('./models/Admin')

const sequelize=new Sequelize('cabinet','root','n122221B',{
    host:'localhost',
    dialect:'mysql'
});
const Admin=AdminModel(sequelize,Sequelize);
const Timeoc=TimeOcuModel(sequelize,Sequelize)
const Time=TypeTimeModel(sequelize,Sequelize);
const RendezVous=TypeRendezVousModel(sequelize,Sequelize);

sequelize.sync({ force:false})
    .then(() => {
        console.log(" database init")
    });
    module.exports={
        RendezVous,Time,Timeoc,Admin
    }

