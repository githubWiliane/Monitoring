import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AlimentationScreen = () => {
  const [nombrePoissons, setNombrePoissons] = useState('');
  const [poidsTotal, setPoidsTotal] = useState('');
  const [resultat, setResultat] = useState('');

  // États pour les heures de distribution
  const [heure1, setHeure1] = useState(new Date());
  const [heure2, setHeure2] = useState(new Date());
  const [heure3, setHeure3] = useState(new Date());

  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);

  // État pour le régulateur
  const [isRegulatorOn, setIsRegulatorOn] = useState(false);

  const calculerAlimentation = () => {
    if (nombrePoissons && poidsTotal) {
      const quantiteAlimentation = (parseFloat(poidsTotal) / parseInt(nombrePoissons)) * 0.03;
      setResultat(`Quantité d'alimentation: ${quantiteAlimentation.toFixed(2)} kg`);
    } else {
      setResultat('Veuillez entrer les deux valeurs');
    }
  };

  const formatHeure = (date) => {
    const heures = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${heures}:${minutes}`;
  };

  const toggleSwitch = () => setIsRegulatorOn(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Image
        source={require('../AlimentationScreen/ALIMENTATION.png')}
        style={styles.icon}
        resizeMode="contain"
      />

      {/* Ajouter le bouton régulateur en haut à droite */}
      <View style={styles.switchContainer}>
        <Text style={styles.regulatorLabel}>Distributeur</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isRegulatorOn ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isRegulatorOn}
        />
        <Text>{isRegulatorOn ? 'ON' : 'OFF'}</Text>
      </View>

      <Text style={styles.label}>Nombre total :</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez nombre total des poissons"
        keyboardType="numeric"
        value={nombrePoissons}
        onChangeText={setNombrePoissons}
      />

      <Text style={styles.label}>Poids total (kg) :</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez poids total de vos poissons"
        keyboardType="numeric"
        value={poidsTotal}
        onChangeText={setPoidsTotal}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculerAlimentation}>
          <Text style={styles.buttonText}>CALCULER</Text>
        </TouchableOpacity>
      </View>

      {/* Sélecteurs d'heure */}
      <View style={styles.timeContainer}>
        <View style={styles.timeRow}>
          <Text style={styles.labelHeure}>Heure 1 :</Text>
          <TouchableOpacity style={styles.selectButton} onPress={() => setShowPicker1(true)}>
            <Text style={styles.buttonText}>Sélectionner</Text>
          </TouchableOpacity>
          <Text style={styles.selectedTime}>{formatHeure(heure1)}</Text>
        </View>
        {showPicker1 && (
          <DateTimePicker
            value={heure1}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker1(false);
              if (selectedDate) {
                setHeure1(selectedDate);
              }
            }}
          />
        )}

        <View style={styles.timeRow}>
          <Text style={styles.labelHeure}>Heure 2 :</Text>
          <TouchableOpacity style={styles.selectButton} onPress={() => setShowPicker2(true)}>
            <Text style={styles.buttonText}>Sélectionner</Text>
          </TouchableOpacity>
          <Text style={styles.selectedTime}>{formatHeure(heure2)}</Text>
        </View>
        {showPicker2 && (
          <DateTimePicker
            value={heure2}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker2(false);
              if (selectedDate) {
                setHeure2(selectedDate);
              }
            }}
          />
        )}

        <View style={styles.timeRow}>
          <Text style={styles.labelHeure}>Heure 3 :</Text>
          <TouchableOpacity style={styles.selectButton} onPress={() => setShowPicker3(true)}>
            <Text style={styles.buttonText}>Sélectionner</Text>
          </TouchableOpacity>
          <Text style={styles.selectedTime}>{formatHeure(heure3)}</Text>
        </View>
        {showPicker3 && (
          <DateTimePicker
            value={heure3}
            mode="time"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker3(false);
              if (selectedDate) {
                setHeure3(selectedDate);
              }
            }}
          />
        )}
      </View>

      {resultat ? <Text style={styles.resultat}>{resultat}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004d4d',
    padding: 20,
  },
  icon: {
    width: 160,
    height: 200,
    marginBottom: 10,
  },
  switchContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  regulatorLabel: {
    color: 'white',
    marginRight: 10,
  },
  label: {
    fontSize: 18,
    color: 'white',
    marginBottom: 6,
  },
  labelHeure: {
    fontSize: 18,
    color: 'white',
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 10,
    marginBottom: 10,
  },
  calculateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectButton: {
    backgroundColor: 'gray', // Couleur d'arrière-plan grise
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  timeContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
    width: '80%',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  selectedTime: {
    fontSize: 16,
    color: 'white',
    marginLeft: 5,
  },
  resultat: {
    marginTop: 20,
    fontSize: 18,
    color: '#f5dd4b',
  },
});

export default AlimentationScreen; 
