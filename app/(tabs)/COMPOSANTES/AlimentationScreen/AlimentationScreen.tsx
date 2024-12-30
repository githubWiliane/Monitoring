import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  Animated,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AlimentationScreen({ navigation }) {
  const [nombrePoissons, setNombrePoissons] = useState('');
  const [poidsTotal, setPoidsTotal] = useState('');
  const [resultat, setResultat] = useState('');

  const [heure1, setHeure1] = useState(new Date());
  const [heure2, setHeure2] = useState(new Date());
  const [heure3, setHeure3] = useState(new Date());

  const [showPicker1, setShowPicker1] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);

  const [isRegulatorOn, setIsRegulatorOn] = useState(false);

  const [tutorialStep, setTutorialStep] = useState(0);
  const [opacity] = useState(new Animated.Value(0));
  const [tutorialActive, setTutorialActive] = useState(true);

  const tutorialData = [
    { text: "Saisissez ici le nombre total de poissons", top: 250, left: 85 },
    { text: "Saisissez ici le poids total des poissons", top: 335, left: 85 },
    { text: "Appuyez ici pour calculer la ration", top: 400, left: 110 },
    { text: "Veuillez programmer l'heure de distribution ici.", top: 510, left: 60 },
    
  ];

  useEffect(() => {
    if (tutorialActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [opacity, tutorialActive]);

  const handleNextStep = () => {
    if (tutorialStep < tutorialData.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      closeTutorial();
    }
  };

  const closeTutorial = () => {
    setTutorialActive(false);
    setTutorialStep(0);
  };

  const calculerAlimentation = () => {
    if (nombrePoissons && poidsTotal) {
      const quantiteAlimentation = (parseFloat(poidsTotal) / parseInt(nombrePoissons)) * 0.03;
      setResultat(`Quantité d'alimentation: ${quantiteAlimentation.toFixed(2)} kg`);
    } else {
      setResultat('Veuillez  les deux valeurs');
    }
  };

  const formatHeure = (date) => {
    const heures = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${heures}:${minutes}`;
  };

  const toggleSwitch = () => setIsRegulatorOn((previousState) => !previousState);

  return (
    <View style={styles.container}>
      {tutorialActive && tutorialStep < tutorialData.length && (
        <View style={styles.overlay}>
          <View
            style={[
              styles.tooltip,
              {
                top: tutorialData[tutorialStep].top,
                left: tutorialData[tutorialStep].left,
              },
            ]}
          >
            <Text style={styles.tooltipText}>{tutorialData[tutorialStep].text}</Text>
            <Animated.View
              style={[
                styles.arrow,
                { opacity, transform: [{ rotate: '45deg' }] },
              ]}
            />
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>
              {tutorialStep < tutorialData.length - 1 ? 'Suivant' : 'Terminer'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

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
    flex: 1, // Permet au conteneur d'occuper tout l'écran
    justifyContent: 'center', // Centrer verticalement les éléments
    alignItems: 'center', // Centrer horizontalement les éléments
    backgroundColor: '#002A37', // Couleur d'arrière-plan
    paddingBottom: 60, // Ajoute de l'espace en bas pour éviter que le contenu masque le bouton
  },
  
  icon: {
    width: 160,
    height: 200,
    marginBottom: 40,
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
  tooltip: {
    position: 'absolute',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tooltipText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  arrow: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 3,
    borderBottomColor: '#007ACC', // Couleur de la flèche
    borderRightWidth: 3,
    borderRightColor: '#007ACC',
    transform: [{ rotate: '45deg' }],
    marginTop: 5,
  },
  nextButton: {
    position: 'absolute', // Place le bouton par rapport au conteneur parent (ou à l'écran si aucun parent avec `relative`)
    bottom: 50, // 20 pixels au-dessus du bas de l'écran
    alignSelf: 'center', // Centre le bouton horizontalement
    
    backgroundColor: '#007ACC', // Couleur de fond
    paddingVertical: 12, // Ajoute de l'espace vertical (pour rendre le bouton plus grand)
    paddingHorizontal: 20, // Ajoute de l'espace horizontal
    borderRadius: 8, // Arrondit les coins
    zIndex: 1000, // Assure que le bouton est au-dessus des autres éléments
  },
  
    // Effet de gris
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond gris semi-transparent
      zIndex: 998, // Position de l'overlay
    },
  
  
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});