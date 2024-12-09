import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TableauDebord from './app/(tabs)/COMPOSANTES/TableauBord/DashboardScreen';
import AlimentationScreen from './app/(tabs)/COMPOSANTES/AlimentationScreen/AlimentationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TableauDebord">
        <Stack.Screen
          name="TableauDebord"
          component={TableauDebord}
          options={{ title: 'Tableau de Bord' }}
        />
        <Stack.Screen
          name="Alimentation"
          component={AlimentationScreen}
          options={{ title: 'Alimentation' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
