import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GraphiquesScreen() {
  const [historicalData, setHistoricalData] = useState([]);
  const [error, setError] = useState(null);  // Etat pour gérer les erreurs
  
  useEffect(() => {
    const fetchHistoricalData = async () => {
      const data = await getHistoricalData();
      if (data.length === 0) {
        setError("Aucune donnée disponible.");
      } else {
        setError(null); // Réinitialiser l'erreur si des données sont disponibles
      }
      setHistoricalData(data);
    };
    fetchHistoricalData();
  }, []);

  const getHistoricalData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('historicalData');
      const parsedData = storedData ? JSON.parse(storedData) : [];
      console.log('Données historiques récupérées:', parsedData); // Vérification des données
      return parsedData;
    } catch (e) {
      console.log('Erreur de récupération des données', e);
      return [];
    }
  };

  // Filtrer les données invalides (NaN, Infinity)
  const filteredData = historicalData.filter(item => {
    return !isNaN(item.temperature) && item.temperature !== Infinity && item.temperature !== -Infinity;
  });

  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: filteredData.map(item => item.time), // Extrait l'heure pour l'axe X
    datasets: [
      {
        data: filteredData.map(item => item.temperature), // Données de température
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historique des Données</Text>

      {/* Affichage d'une erreur si aucune donnée valide */}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          yAxisLabel="°C"
          chartConfig={{
            backgroundColor: '#002A37',
            backgroundGradientFrom: '#00A0B2',
            backgroundGradientTo: '#007ACC',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002A37',
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  errorText: {
    color: '#FF0000',  // Couleur rouge pour l'erreur
    fontSize: 18,
  },
});
