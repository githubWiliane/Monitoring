import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './app/(tabs)/COMPOSANTES/SplashScreen/SplashScreen.js'; // Assurez-vous que le chemin est correct
import TableauDebord from './app/(tabs)/COMPOSANTES/TableauBord/DashboardScreen';
import AlimentationScreen from './app/(tabs)/COMPOSANTES/AlimentationScreen/AlimentationScreen';
import GraphiquesScreen from './app/(tabs)/COMPOSANTES/graphique/GraphiquesScreen.js';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* SplashScreen est l'écran initial */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} // Masque l'en-tête du SplashScreen
        />

        {/* Les autres écrans de l'application */}
        <Stack.Screen
          name="TableauDebord"
          component={TableauDebord}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Alimentation"
          component={AlimentationScreen}
          options={{ title: 'Alimentation' }}
        />
        <Stack.Screen
          name="Graphiques"
          component={GraphiquesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
