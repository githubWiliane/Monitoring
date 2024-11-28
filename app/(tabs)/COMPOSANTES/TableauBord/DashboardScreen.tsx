import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TABLEAU DE BORD</Text>
      
      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Temperature')}
      >
        <View style={styles.row}>
          <Text style={styles.boldText}>Température de l'eau <Text style={styles.value}>20°C</Text></Text>
          <Text style={styles.arrow}> {'>'}</Text>
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
          <Text style={styles.boldText}>Température de l'air <Text style={styles.value}>25°C</Text></Text>
          <Text style={styles.arrow}> {'>'}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Humidité')}
      >
        <View style={styles.row}>
          <Text style={styles.boldText}>Humidité de l'air <Text style={styles.value}>60%</Text></Text>
          <Text style={styles.arrow}> {'>'}</Text>
        </View>
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
});

export default DashboardScreen;
