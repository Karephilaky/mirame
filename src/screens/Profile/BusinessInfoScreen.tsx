import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/common';

const BusinessInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Información del Negocio</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
});

export default BusinessInfoScreen; 