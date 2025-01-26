import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/common';
import { Servicio } from '../../types/database';
import { useAppSelector } from '../../hooks/useRedux';

const ServiceSelectorScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedServices, setSelectedServices] = useState<Servicio[]>([]);
  const services = useAppSelector(state => state.services.services);

  const handleSelectService = (service: Servicio) => {
    const isSelected = selectedServices.some(s => s.id === service.id);
    if (isSelected) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleConfirm = () => {
    if (selectedServices.length === 0) {
      Alert.alert('Error', 'Por favor selecciona al menos un servicio');
      return;
    }
    // Aquí enviaríamos los servicios seleccionados de vuelta a NewAppointmentScreen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Seleccionar Servicios</Text>
      </View>

      <ScrollView style={styles.content}>
        {services.map(service => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceItem,
              selectedServices.some(s => s.id === service.id) && styles.selectedServiceItem
            ]}
            onPress={() => handleSelectService(service)}
          >
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.nombre}</Text>
              <Text style={styles.serviceDetails}>
                {service.duracion} · ${service.precio}
              </Text>
            </View>
            <Ionicons
              name={selectedServices.some(s => s.id === service.id) ? 
                "checkmark-circle" : "checkmark-circle-outline"}
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            selectedServices.length === 0 && styles.buttonDisabled
          ]}
          onPress={handleConfirm}
          disabled={selectedServices.length === 0}
        >
          <Text style={styles.confirmButtonText}>
            Confirmar ({selectedServices.length})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedServiceItem: {
    backgroundColor: COLORS.primary + '10',
    borderColor: COLORS.primary,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  serviceDetails: {
    fontSize: 14,
    color: COLORS.gray,
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.5,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ServiceSelectorScreen; 