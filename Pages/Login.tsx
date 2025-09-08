import { View, Text, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { Usuario } from '../Modelos/Usuario'
import { useNavigation } from '@react-navigation/native';


  
export default function Login() {
const navigation = useNavigation();
    const [nombre, setNombre] = useState<string>('')
    const [contraseña, setContraseña] = useState<string>('')
 

    async function login(nombre: string, contraseña:string){
        if (!nombre || !contraseña) {
        Alert.alert('Error', 'Por favor, completa todos los campos.');
        return;
    }

            let usuario: Usuario={
                nombre:nombre,
                contraseña:contraseña
            }
            
        const respuesta= await fetch('http://192.168.1.38:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(usuario)
        });
            
        const respuestaApi= await respuesta.json()

        if(respuestaApi.success===true && respuestaApi.noUser===false){
            Alert.alert("Login Exitoso")
            navigation.navigate('InicioUsuario' as never) 
        }else if(respuestaApi.noUser===true && respuestaApi.success===false){
            Alert.alert("Login Exitoso")
            navigation.navigate('InicioAdministrador' as never) 
        }else
         {
             Alert.alert('Ocurrio un error, credenciales incorrectas')
        }
    }

    return (
        <View>
            <Text>Login</Text>

            <TextInput placeholder='Nombre'
                value={nombre}
                onChangeText={setNombre}
            ></TextInput>

            <TextInput placeholder='Contraseña'
                value={contraseña}
                onChangeText={setContraseña}
            ></TextInput>

            <Button title='Iniciar Sesion' onPress={(e)=>login(nombre,contraseña)}></Button>
        </View>
    )
}