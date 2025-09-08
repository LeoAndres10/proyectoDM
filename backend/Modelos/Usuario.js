const { DataTypes } = require('sequelize');
const sequelize = require('../Conexion/db');

const Usuario = sequelize.define('usuario', {
   
    nombre: {
        type: DataTypes.STRING
    },

    contraseña: {
        type: DataTypes.STRING
    },
    correo:{
        type: DataTypes.STRING
    },
    direccion:{
        type: DataTypes.STRING
    }
   
    
},
    {
        tableName: 'usuario',
        timestamps: false
    }
)

module.exports=Usuario;