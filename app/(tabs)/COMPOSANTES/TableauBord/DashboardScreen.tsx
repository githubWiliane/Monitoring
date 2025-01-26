import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TableauDebord({ navigation }) {
  // LIAISON ESP32
  const [data, setData] = useState({ temperature: null, humidity: null, tempDS18B20: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false); // État de la connexion

  const ESP32_IP = "http://192.168.4.1";

  const fetchData = async () => {
    try {
      const response = await axios.get(`${ESP32_IP}`);
      setData(response.data);
      setLoading(false);
      setConnected(true); // Si les données sont récupérées, l'ESP32 est connecté
    } catch (err) {
      setError("Impossible de récupérer les données.");
      setLoading(false);
      setConnected(false); // En cas d'erreur, l'ESP32 est déconnecté
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Tableau de bord */}
      <View style={styles.header}>
        <Text style={styles.headerText}>TABLEAU DE BORD</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.parameter}>
          <CircularProgress value={data.tempDS18B20} radius={70} progressValueColor="#fff" duration={1000} valueSuffix="°C" />
          <Text style={styles.label}>T° de l'Eau</Text>
        </View>
        <View style={styles.parameter}>
          <CircularProgress value={data.temperature} radius={70} progressValueColor="#fff" duration={1000} valueSuffix="°C" />
          <Text style={styles.label}>T° de l'Air</Text>
        </View>
        <View style={styles.parameter}>
          <CircularProgress value={data.humidity} radius={70} progressValueColor="#fff" duration={1000} valueSuffix="%" />
          <Text style={styles.label}>Humidité (Air)</Text>
        </View>
        <View style={styles.parameter}>
          <CircularProgress value={30} radius={70} progressValueColor="#fff" duration={1000} valueSuffix="Atm" />
          <Text style={styles.label}>Pression Atm</Text>
        </View>
      </View>

      {/* Barre blanche */}
      <View style={styles.iconSeparator} />

      {/* Alignement des deux icônes */}
      <View style={styles.iconContainer}>
        {/* Icône de Nourrissage des Poissons */}
        <TouchableOpacity onPress={() => navigation.navigate('Alimentation')}>
          <Image source={require('../AlimentationScreen/ALIMENTATION.png')} style={styles.iconAlimentation} />
        </TouchableOpacity>

        {/* Icône Graphiques */}
        <TouchableOpacity onPress={() => navigation.navigate('Graphiques')}>
          <Icon name="bar-chart" size={60} color="#fff" style={styles.iconGraphique} />
        </TouchableOpacity>
      </View>

      {/* Déplacement des messages en dessous de l'icône des graphiques */}
      {loading && !connected && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>En attente des données...</Text>
        </View>
      )}

      {connected && !loading && (
        <View style={styles.connectionContainer}>
          <Text style={styles.connectionText}>Connexion rétablie !</Text>
        </View>
      )}

      {/* Affichage du message d'erreur en cas de problème de connexion */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
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
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 33,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  parameter: {
    alignItems: 'center',
    margin: 10,
    width: '40%',
    padding: 10,
    borderRadius: 10,
  },
  label: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  },
  iconSeparator: {
    height: 2, // Épaisseur de la barre
    backgroundColor: '#fff', // Couleur blanche
    marginHorizontal: 20, // Marges latérales
    marginBottom: 20, // Espace entre la barre et les icônes
  },
  iconContainer: {
    flexDirection: 'row', // Aligner les icônes horizontalement
    justifyContent: 'center', // Centrer les icônes
    marginTop: 20,
  },
  iconGraphique: {
    marginLeft: 20,
  },
  iconAlimentation: {
    width: 70, // Taille de l'image
    height: 70, // Taille de l'image
    resizeMode: 'contain', // Bien contenir l'image
    marginRight: 70, // Espacement entre les icônes
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row', // Aligner le spinner et le texte horizontalement
    justifyContent: 'center', // Centrer horizontalement
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10, // Espace entre le spinner et le texte
  },
  connectionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  connectionText: {
    color: '#00FF00', // Couleur verte
    fontSize: 18,
  },
  errorContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#FF0000', // Couleur rouge
    fontSize: 18,
  },
});
