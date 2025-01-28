import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const DevMenu: React.FC = () => {
  console.log('DevMenu rendering'); // Para debug

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => console.log('DevMenu pressed')}
      >
        <Text style={styles.text}>DEV</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    zIndex: 10000,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: 'red',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DevMenu; 