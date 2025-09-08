const express = require('express');
const cors = require('cors');
const Usuario = require('./Modelos/Usuario');
const Administrador = require('./Modelos/Administrador');
const sequelize = require('./Conexion/db');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express();
app.use(express.json());
app.use(cors());

app.post('/login', async(req,res)=> {

  try {
    const { nombre} = req.body;
 
    const  {contraseña} = req.body;

    const usuario = await Usuario.findOne({ where: { nombre } });
 
   const administrador = await Administrador.findOne({ where: { nombre } });


    if (usuario){
    const passwordUsuario = await bcrypt.compare(contraseña,usuario.contraseña);
  
    if(passwordUsuario){
    const tokenU = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, 'contraseña_secreta', {
      expiresIn: '1h'
    });
    if(tokenU){
        return res.json({success:true,noUser:false, message: 'Login exitoso' ,data:usuario });
    
        }else{
            return res.json({success:false, message: 'Contraseña incorrecta', data:usuario });
        }
    }else{
    return res.json({success:false, message: 'Usuarios no encontrado', data:usuario });
    } 


    } else if(administrador) {
         const passwordAdministrador = await bcrypt.compare(contraseña, administrador.contraseña);
            if(passwordAdministrador){
        const tokenAd = jwt.sign({ id: administrador.id, nombre: administrador.nombre }, 'contraseña_secreta', {
          expiresIn: '1h'
        });
        
        if(tokenAd){
           return res.json({ad: true,noUser:true ,success:false, message: 'Login exitoso', data:administrador });
        
            }else{
                return res.json({ad:false, success:false,message: 'Contraseña incorrecta', data:administrador});
            }
        }else{
        return res.json({ ad:false ,success:false, message: 'Usuario no encontrado', data:administrador });
        } 
        }else{
           return res.json({ad:false, noUser:true, message: 'Usuario no encontrado'});
        }
        
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' + error.message });
  }
});

app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, contraseña, correo, direccion } = req.body;
 
    // Validación básica
    if (!nombre || !contraseña || !correo || !direccion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    
    const newUsuario = await Usuario.create({
      nombre,
      contraseña: hashedPassword, 
      correo,
      direccion
      
    });

    console.log(newUsuario);

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: {
        id: newUsuario.id,
        nombre: newUsuario.nombre,
        correo: newUsuario.correo,
        direccion: newUsuario.direccion
      
      }
    });

  } catch (error) {
    console.error('Error al crear maestro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

  
   
    

app.post('/administrador', async (req, res) => {
  try { 
    const { nombre, contraseña } = req.body;

    // Validación básica
    if (!nombre || !contraseña) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    
    const newAdministrador = await Administrador.create({
      nombre,
      contraseña: hashedPassword
      
    });

    console.log(newAdministrador);

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: {
        id: newAdministrador.id,
        nombre: newAdministrador.nombre
       
      }
    });

  } catch (error) {
    console.error('Error al crear administrador:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(5000, () =>{
    console.log('Aplicacion Iniciada en el puerto 5000')
});
