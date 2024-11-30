import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const TemperatureAirScreen = () => {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Adresse IP locale de l'ESP32
  const ESP32_IP = "http://192.168.4.1";

  // Fonction pour récupérer les données depuis l'ESP32
  const fetchData = async () => {
    try {
      const response = await axios.get(`${ESP32_IP}`);
      setTemperature(response.data.temperature);
      setLoading(false);
    } catch (err) {
      setError("Impossible de récupérer les données.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../TemperatureScreen/temp.png')} // Ajustez le chemin
        style={styles.icon}
        resizeMode="contain"
      />

      {loading ? (
        <>
          <ActivityIndicator size="large" color="#1E90FF" style={styles.spinner} />
          <Text style={styles.loadingText}>Chargement des données...</Text>
        </>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <Text style={styles.label}>Température de l'air</Text>
          <View style={styles.gaugeContainer}>
            <View
              style={[
                styles.gauge,
                {
                  width: `${Math.min(Math.max(temperature, 0), 50) * 2}%`, // Normalisation entre 0 et 50°C
                },
              ]}
            />
          </View>
          <Text style={styles.value}>{temperature} °C</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A2E', // Bleu marine sombre constant
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: 'white',
  },
  icon: {
    width: 130,
    height: 200,
    marginBottom: 20,
  },
  label: {
    fontSize: 24,
    color: 'white',
  },
  gaugeContainer: {
    width: 200,
    height: 10,
    backgroundColor: 'black', // Couleur de base de la jauge
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 20,
  },
  gauge: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: 'turquoise', // Vert clair pour indiquer la progression
  },
  value: {
    fontSize: 48,
    color: 'white',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default TemperatureAirScreen;
