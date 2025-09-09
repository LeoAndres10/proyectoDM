import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native'
import { Usuario } from '../Modelos/Usuario';

export default function RegistroUsuario() {
    const navigation = useNavigation();
        const [nombre, setNombre] = useState<string>('')
        const [contraseña, setContraseña] = useState<string>('')
         const [correo, setCorreo] = useState<string>('')
          const [direccion, setDireccion] = useState<string>('')


           async function registroUsuario(nombre: string, contraseña:string, correo:string, direccion:string){
                  if (!nombre || !contraseña || !correo || !direccion) {
                  Alert.alert('Error', 'Por favor, completa todos los campos.');
                  return;
              }
          
                      let usuario={
                          nombre:nombre,
                          contraseña:contraseña,
                          correo:correo,
                          direccion:direccion
                          
                      }
                      
                  const respuesta= await fetch('http://192.168.1.38:5000/usuarios', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body:JSON.stringify(usuario)
                  });
                      
                  const respuestaApi= await respuesta.json()
          
                  if(respuestaApi.success){
                     Alert.alert('Registro Exitoso')
                     navigation.navigate('InicioUsuario' as never)
                  }else
                   {
                       Alert.alert('Ocurrio un error, credenciales incorrectas')
                  }
              }
  return (
   <View>
               <Text>Registrar Usuario</Text>
   
               <TextInput placeholder='Nombre'
                   value={nombre}
                   onChangeText={setNombre}
               ></TextInput>
   
               <TextInput placeholder='Contraseña'
                   value={contraseña}
                   onChangeText={setContraseña}
               ></TextInput>
                     <TextInput placeholder='Correo'
                   value={correo}
                   onChangeText={setCorreo}
               ></TextInput>
                <TextInput placeholder='Direccion'
                   value={direccion}
                   onChangeText={setDireccion}
               ></TextInput>
               <Button title='Registrar Usuario' onPress={()=>registroUsuario(nombre,contraseña,correo,direccion)}></Button>
           <Button title='Ya tienes cuenta?'
            onPress={() => navigation.navigate('Login' as never)}
          
          />
           </View>
  )
}
