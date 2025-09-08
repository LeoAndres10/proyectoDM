import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navegacion from './Components/Navegacion';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function App() {

  return (
    <><View>
      <Text>PIXELTEE</Text>

    </View><Navegacion
    ></Navegacion></> 
 
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
