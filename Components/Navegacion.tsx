import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Pages/Login';
import InicioUsuario from '../Pages/InicioUsuario';
import { TabBarItemLabelVisibilityMode } from 'react-native-screens';
import InicioAdministrador from '../Pages/InicioAdministrador';
import RegistroUsuario from '../Pages/RegistroUsuario';

export default function Navegacion() {

    const tab= createBottomTabNavigator();

  return (
    
   <NavigationContainer>
        <tab.Navigator>
            <tab.Screen name='Login' component={Login}></tab.Screen>
             <tab.Screen
        name='InicioUsuario'
        component={InicioUsuario}
        options={{ tabBarButton: () => null}}
      ></tab.Screen>
      <tab.Screen
        name='InicioAdministrador'
        component={InicioAdministrador}
        options={{ tabBarButton: () => null}}
      ></tab.Screen>
      <tab.Screen
        name='RegistroUsuario'
        component={RegistroUsuario}
        options={{ tabBarButton: () => null}}
      ></tab.Screen>
        </tab.Navigator>
  </NavigationContainer>
   
  )
} 