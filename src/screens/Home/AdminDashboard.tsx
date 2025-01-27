import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/common';

const AdminDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administración</Text>
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

export default AdminDashboard; 