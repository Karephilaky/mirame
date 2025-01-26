import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { COLORS } from '../../styles/common';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { servicesApi } from '../../api';
import { addService, updateService } from '../../store/slices/servicesSlice';
import { ServiceStackParamList } from '../../navigation/types';
import { Servicio } from '../../types/database';

type ServiceFormScreenRouteProp = RouteProp<ServiceStackParamList, 'ServiceForm'>;

const ServiceFormScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ServiceFormScreenRouteProp>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const serviceToEdit = route.params?.serviceId 
    ? useAppSelector(state => 
        state.services.services.find(s => s.id === route.params?.serviceId)
      )
    : null;

  const [formData, setFormData] = useState({
    nombre: serviceToEdit?.nombre || '',
    descripcion: serviceToEdit?.descripcion || '',
    precio: serviceToEdit?.precio?.toString() || '',
    duracion: serviceToEdit?.duracion || '',
  });

  const handleSubmit = async () => {
    if (!formData.nombre || !formData.precio) {
      Alert.alert('Error', 'Por favor completa los campos requeridos');
      return;
    }

    try {
      setIsLoading(true);
      const serviceData: Partial<Servicio> = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        duracion: formData.duracion,
      };

      if (serviceToEdit) {
        const updatedService = await servicesApi.update(serviceToEdit.id, serviceData);
        dispatch(updateService(updatedService));
        Alert.alert('Éxito', 'Servicio actualizado correctamente');
      } else {
        const newService = await servicesApi.create(serviceData);
        dispatch(addService(newService));
        Alert.alert('Éxito', 'Servicio creado correctamente');
      }
      
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Error',
        'No se pudo guardar el servicio. Por favor intenta nuevamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>
          {serviceToEdit ? 'Editar Servicio' : 'Nuevo Servicio'}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          label="Nombre del servicio"
          value={formData.nombre}
          onChangeText={(text) => setFormData({ ...formData, nombre: text })}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Descripción"
          value={formData.descripcion}
          onChangeText={(text) => setFormData({ ...formData, descripcion: text })}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
        />

        <TextInput
          label="Precio"
          value={formData.precio}
          onChangeText={(text) => setFormData({ ...formData, precio: text })}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          label="Duración (minutos)"
          value={formData.duracion}
          onChangeText={(text) => setFormData({ ...formData, duracion: text })}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Guardando...' : 'Guardar Servicio'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  input: {
    backgroundColor: COLORS.white,
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ServiceFormScreen; 