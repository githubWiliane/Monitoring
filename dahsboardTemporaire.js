import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const SensorDataScreen = () => {
  const [data, setData] = useState({ temperature: null, humidity: null, tempDS18B20: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Adresse IP locale de l'ESP32 en mode point d'accès
  const ESP32_IP = "http://192.168.4.1"; // Adresse par défaut du point d'accès ESP32

  const fetchData = async () => {
    try {
      const response = await axios.get(`${ESP32_IP}`);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Impossible de récupérer les données.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000); // Met à jour les données toutes les 2 secondes
    return () => clearInterval(interval); // Nettoie l'intervalle lors de la fermeture
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement des données...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Données des Capteurs</Text>
      <Text style={styles.data}>Température (DHT11) : {data.temperature} °C</Text>
      <Text style={styles.data}>Humidité (DHT11) : {data.humidity} %</Text>
      <Text style={styles.data}>Température (DS18B20) : {data.tempDS18B20} °C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  data: {
    fontSize: 18,
    marginVertical: 10,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});

export default SensorDataScreen;
