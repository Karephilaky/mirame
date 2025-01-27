import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/common';

const ClientDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Mírame</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default ClientDashboard; 