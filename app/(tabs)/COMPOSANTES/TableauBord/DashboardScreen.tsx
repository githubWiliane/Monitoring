import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function TableauDebord({ navigation }) {
  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.headerText}>TABLEAU DE BORD</Text>
      </View>

      {/* Paramètres */}
      <View style={styles.grid}>
        <View style={styles.parameter}>
        <CircularProgress
  value={100}
  radius={70}
  progressValueColor={'#fff'}
  duration={10000}
  strokeColorConfig={[
    { color: 'red', value: 0 },
    { color: 'skyblue', value: 50 },
    { color: 'yellowgreen', value: 100 },
  ]}
  valueSuffix={'°C'} // Ajout de l'unité
  progressValueStyle={{ fontSize: 26 }}
/>

          <Text style={styles.label}>T° de l'Eau</Text>
        </View>
        <View style={styles.parameter}>
        <CircularProgress
  value={100}
  radius={70}
  progressValueColor={'#fff'}
  duration={10000}
  strokeColorConfig={[
    { color: 'red', value: 0 },
    { color: 'skyblue', value: 50 },
    { color: 'yellowgreen', value: 100 },
  ]}
  valueSuffix={'°C'} // Ajout de l'unité
  progressValueStyle={{ fontSize: 26 }}
/>

          <Text style={styles.label}>T° de l'Air</Text>
        </View>
        <View style={styles.parameter}>
          <CircularProgress
            value={100}
            radius={70}
            progressValueColor={'#fff'}
            duration={10000}
            strokeColorConfig={[
              { color: 'red', value: 0 },
              { color: 'skyblue', value: 50 },
              { color: 'yellowgreen', value: 100 },
            ]}
            progressValueStyle={{ fontSize: 26 }}
          />
          <Text style={styles.label}>Humidité (Air)</Text>
        </View>
        <View style={styles.parameter}>
        <CircularProgress
  value={100}
  radius={70}
  progressValueColor={'#fff'}
  duration={10000}
  strokeColorConfig={[
    { color: 'red', value: 0 },
    { color: 'skyblue', value: 50 },
    { color: 'yellowgreen', value: 100 },
  ]}
  valueSuffix={'Atm'} // Ajout de l'unité
  progressValueStyle={{ fontSize: 26 }}
/>

          <Text style={styles.label}>Préssion Atm</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Alimentation')}>
  <Text style={styles.buttonText}>ALIMENTATION</Text>
</TouchableOpacity>


      {/* État de l'aérateur */}
      <View style={styles.aerator}>
  <Text style={styles.aeratorLabel}>État aérateur</Text>
  {/* Conteneur pour les cercles */}
  <View style={styles.circleContainer}>
    <View style={[styles.circle, { backgroundColor: "green" }]} />
    <View style={[styles.circle, { backgroundColor: "red" }]} />
  </View>
</View>

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
  value: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5, // Espacement entre la barre et le texte
  },
  button: {
    backgroundColor: '#007ACC',
    padding: 15,
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 20,
    width: '70%', // Réduction de la largeur
    alignSelf: 'center', // Centrage du bouton
    // Ombre pour Android
    elevation: 35,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  aerator: {
    alignItems: "center",
    marginTop: 20,
  },
  aeratorLabel: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10, // Cela rend le carré circulaire
    marginHorizontal: 10,
  },
});
