import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../styles/common';
import { Servicio } from '../types/database';

interface ServiceCardProps {
  service: Servicio;
  onPress?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <Text style={styles.name}>{service.nombre}</Text>
      <Text style={styles.description}>{service.descripcion}</Text>
      <Text style={styles.price}>$ {service.precio}</Text>
      <Text style={styles.duration}>{service.duracion} min</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  duration: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
});

export default ServiceCard; 