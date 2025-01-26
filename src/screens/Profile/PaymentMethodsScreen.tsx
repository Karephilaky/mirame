import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/common';

const PaymentMethodsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Métodos de Pago</Text>
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

export default PaymentMethodsScreen; 