import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AlimentationScreen() {
  const [nombrePoissons, setNombrePoissons] = useState('');
  const [poidsTotal, setPoidsTotal] = useState('');
  const [resultat, setResultat] = useState('');

  const [heure1, setHeure1] = useState(new Date());
  const [heure2, setHeure2] = useState(new Date());
  const [heure3, setHeure3] = useState(new Date());

  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);

  const calculerAlimentation = () => {
    if (nombrePoissons && poidsTotal) {
      const quantiteAlimentation = (parseFloat(poidsTotal) / parseInt(nombrePoissons)) * 0.03;
      setResultat(`Quantité d'alimentation: ${quantiteAlimentation.toFixed(2)} kg`);
    } else {
      setResultat('Veuillez saisir les deux valeurs.');
    }
  };

  const formatHeure = (date) => {
    const heures = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${heures}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../AlimentationScreen/ALIMENTATION.png')}
        style={styles.icon}
        resizeMode="contain"
      />

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

      <View style={styles.timeContainer}>
        {[{ heure: heure1, setShow: setShowPicker1, show: showPicker1, setTime: setHeure1 },
          { heure: heure2, setShow: setShowPicker2, show: showPicker2, setTime: setHeure2 },
          { heure: heure3, setShow: setShowPicker3, show: showPicker3, setTime: setHeure3 }].map(
          ({ heure, setShow, show, setTime }, index) => (
            <View key={index} style={styles.timeRow}>
              <Text style={styles.labelHeure}>{`Heure ${index + 1} :`}</Text>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShow(true)}
              >
                <Text style={styles.buttonText}>Sélectionner</Text>
              </TouchableOpacity>
              <Text style={styles.selectedTime}>{formatHeure(heure)}</Text>
              {show && (
                <DateTimePicker
                  value={heure}
                  mode="time"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShow(false);
                    if (selectedDate) {
                      setTime(selectedDate);
                    }
                  }}
                />
              )}
            </View>
          )
        )}
      </View>

      {resultat ? <Text style={styles.resultat}>{resultat}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002A37',
    paddingBottom: 60,
  },
  icon: {
    width: 160,
    height: 200,
    marginBottom: 40,
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
  selectButton: {
    backgroundColor: 'gray',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});
