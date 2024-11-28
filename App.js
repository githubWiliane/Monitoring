import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './app/(tabs)/COMPOSANTES/SplashScreen/SplashScreen';
import DashboardScreen from './app/(tabs)/COMPOSANTES/TableauBord/DashboardScreen';
import TemperatureScreen from './app/(tabs)/COMPOSANTES/TemperatureScreen/TemperatureScreen';
import AlimentationScreen from './app/(tabs)/COMPOSANTES/AlimentationScreen/AlimentationScreen';
import EnergieScreen from './app/(tabs)/COMPOSANTES/EnergieScreen/EnergieScreen';
import ODScreen from './app/(tabs)/COMPOSANTES/ODScreen/ODScreen';
import PhScreen from './app/(tabs)/COMPOSANTES/PhScreen/PhScreen';
import SaliniteScreen from './app/(tabs)/COMPOSANTES/SaliniteScreen/SaliniteScreen';
import HumiditeAirScreen from './app/(tabs)/COMPOSANTES/HumiditeAir/HumiditeAir'
import PressionAtmScreen from './app/(tabs)/COMPOSANTES/PressionAtmospherique/PressionAtmospherique';
import TemperatureAirScreen from './app/(tabs)/COMPOSANTES/TemperatureAir/TemperatureAir';


// Importez les autres écrans ...

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      // Simule la durée de l'écran splash
    }, 3000);
  }, []);

  return (
   
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Temperature" component={TemperatureScreen} />
        <Stack.Screen name="PH" component={PhScreen} />
        <Stack.Screen name="Salinité" component={SaliniteScreen}/>
        <Stack.Screen name="Oxygen" component={ODScreen}/>
        <Stack.Screen name="Alimentation" component={AlimentationScreen}/>
        <Stack.Screen name="Energie" component={EnergieScreen}/>
        <Stack.Screen name="Humidité" component={HumiditeAirScreen}/>
        <Stack.Screen name="PressionAtmospherique" component={PressionAtmScreen}/>
        <Stack.Screen name="TempératureAir" component={TemperatureAirScreen}/>
        

        {/* Ajoutez d'autres écrans de paramètres */}
      </Stack.Navigator>
    </NavigationContainer>
 
  );
};

export default App;
