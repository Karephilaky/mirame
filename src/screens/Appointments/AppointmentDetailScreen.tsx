import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { AppointmentStackParamList, AppointmentScreenNavigationProp } from '../../navigation/types';
import { COLORS } from '../../styles/common';
import { Appointment, AppointmentStatus } from '../../types/database';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { Ionicons } from '@expo/vector-icons';
import { formatAppointmentDate } from '../../utils/dateUtils';

type AppointmentDetailRouteProp = RouteProp<AppointmentStackParamList, 'AppointmentDetail'>;

export const AppointmentDetailScreen: React.FC = () => {
  const route = useRoute<AppointmentDetailRouteProp>();
  const navigation = useNavigation<AppointmentScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { appointmentId } = route.params;
  const [loading, setLoading] = useState(false);
  const appointment = useAppSelector(state => 
    state.appointments.appointments.find(a => a.id === appointmentId)
  );

  const handleStatusChange = async (newStatus: AppointmentStatus) => {
    Alert.alert(
      'Cambiar Estado',
      `¿Estás seguro de cambiar el estado a ${newStatus}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            setLoading(true);
            try {
              // Aquí iría la llamada a la API para actualizar el estado
              // await updateAppointmentStatus(appointmentId, newStatus);
              // dispatch(updateAppointment({ ...appointment, estado: newStatus }));
              Alert.alert('Éxito', 'Estado actualizado correctamente');
            } catch (error) {
              Alert.alert('Error', 'No se pudo actualizar el estado');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('NewAppointment', { appointmentId });
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Cita',
      '¿Estás seguro de eliminar esta cita?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              // Aquí iría la llamada a la API para eliminar la cita
              // await deleteAppointment(appointmentId);
              // dispatch(removeAppointment(appointmentId));
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la cita');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (!appointment) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Cita no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

      <View style={styles.header}>
        <Text style={styles.title}>Detalles de la Cita</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleEdit}
          >
            <Ionicons name="create-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={24} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Fecha y Hora</Text>
        <Text style={styles.infoText}>
          {formatAppointmentDate(appointment.fecha)}
        </Text>
        <Text style={styles.infoText}>{appointment.hora}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Estado</Text>
        <View style={styles.statusButtons}>
          {['pendiente', 'confirmada', 'cancelada', 'completada'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                appointment.estado === status && styles.statusButtonActive,
              ]}
              onPress={() => handleStatusChange(status as AppointmentStatus)}
            >
              <Text style={[
                styles.statusButtonText,
                appointment.estado === status && styles.statusButtonTextActive,
              ]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Cliente</Text>
        <TouchableOpacity
          style={styles.clientButton}
          onPress={() => navigation.navigate('ClientDetail', { clientId: appointment.id_cliente })}
        >
          <Text style={styles.clientButtonText}>Ver detalles del cliente</Text>
          <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  infoSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusButtonText: {
    color: COLORS.text,
    fontSize: 14,
  },
  statusButtonTextActive: {
    color: COLORS.white,
  },
  clientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  clientButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 20,
  },
}); 