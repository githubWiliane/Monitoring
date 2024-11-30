import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const DashboardScreen = ({ navigation }) => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  // Adresse IP de l'ESP32 (point d'accès)
  const ESP32_IP = "http://192.168.4.1";

  // Fonction pour récupérer les données de l'ESP32
  const fetchData = async () => {
    try {
      const response = await axios.get(ESP32_IP);
      setTemperature(response.data.temperature);
      setHumidity(response.data.humidity);
    } catch (err) {
      console.error("Erreur lors de la récupération des données : ", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000); // Mise à jour toutes les 2 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TABLEAU DE BORD</Text>

      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Temperature')}
      >
        <View style={styles.row}>
          <Text style={styles.boldText}>
            Température de l'eau
          </Text>
          <Text style={styles.value}>
            {temperature !== null ? `${temperature} °C` : <ActivityIndicator size="small" color="#00f" />}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('PH')}
      >
        <View style={styles.row}>
          <Text style={styles.boldText}>pH <Text style={styles.value}>12</Text></Text>
          <Text style={styles.arrow}> {'>'}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Salinité')}
      >
        <View style={styles.row}>
          <Text style={styles.boldText}>Salinité <Text style={styles.value}>20g/l</Text></Text>
          <Text style={styles.arrow}> {'>'}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Oxygen')}
      >
        <View style={styles.row}>
          <Text style={styles.boldText}>Oxygène Dissous (OD) <Text style={styles.value}>2mg/L</Text></Text>
          <Text style={styles.arrow}> {'>'}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Alimentation')}
      >
        <View style={styles.row}>
          <Text style={styles.boldText}>Alimentation</Text>
          <Text style={styles.arrow}> {'>'}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Energie')}
      >
        <View style={styles.row}>
          <Text style={styles.boldText}>Energie <Text style={styles.value}>99%</Text></Text>
          <Text style={styles.arrow}> {'>'}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('PressionAtmospherique')}
      >
        <View style={styles.row}>
          <Text style={styles.boldText}>Pression Atmosphérique <Text style={styles.value}>1013 hPa</Text></Text>
          <Text style={styles.arrow}> {'>'}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('TempératureAir')}
      >
        <View style={styles.row}>
          <Text style={styles.boldText}>
            Température de l'air
          </Text>
          <View style={styles.dataContainer}>
            <Text style={styles.value}>
              {temperature !== null ? `${temperature} °C` : <ActivityIndicator size="small" color="#00f" />}
            </Text>
          </View>
        </View>
        <Text style={styles.arrowNew}> {'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Humidité')}
      >
        <View style={styles.row}>
          <Text style={styles.boldText}>
            Humidité de l'air
          </Text>
          <View style={styles.dataContainer}>
            <Text style={styles.value}>
              {humidity !== null ? `${humidity} %` : <ActivityIndicator size="small" color="#00f" />}
            </Text>
          </View>
        </View>
        <Text style={styles.arrowNew}> {'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#1E3C50',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#2A6F9E',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  value: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
    color: '#fff',
  },
  arrowNew: {
    fontSize: 16,
    color: '#fff',
    marginLeft:"-15",
  },
  dataContainer: {
    marginLeft: 10,
    marginRight:"40",
  },
  spinner: {
    marginLeft: 10,
  },
});

export default DashboardScreen;
