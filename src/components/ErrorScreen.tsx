import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../styles/common';
import { Ionicons } from '@expo/vector-icons';

interface ErrorScreenProps {
  error: Error | string;
  onRetry?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onRetry }) => (
  <View style={styles.container}>
    <Ionicons name="alert-circle-outline" size={48} color={COLORS.error} />
    <Text style={styles.message}>
      {typeof error === 'string' ? error : error.message}
    </Text>
    {onRetry && (
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Reintentar</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  message: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ErrorScreen; 