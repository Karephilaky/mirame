import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../constants/colors';
import { Button } from './Button';
import { Ionicons } from '@expo/vector-icons';

interface ErrorScreenProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  showHome?: boolean;
  onGoHome?: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title = 'Algo salió mal',
  message = 'Ha ocurrido un error inesperado',
  onRetry,
  iconName = 'alert-circle',
  showHome = false,
  onGoHome
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={64} color={COLORS.error} />
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      <View style={styles.buttonContainer}>
        {onRetry && (
          <Button
            title="Reintentar"
            onPress={onRetry}
            variant="primary"
            icon={<Ionicons name="refresh" size={20} color={COLORS.white} />}
          />
        )}
        
        {showHome && onGoHome && (
          <Button
            title="Ir al inicio"
            onPress={onGoHome}
            variant="outline"
            icon={<Ionicons name="home" size={20} color={COLORS.primary} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: COLORS.gray[600],
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 12,
    width: '100%',
    maxWidth: 300,
  },
}); 