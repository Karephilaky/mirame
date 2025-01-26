import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { AppointmentStackParamList, AppointmentScreenNavigationProp } from '../../navigation/types';
import { COLORS } from '../../styles/common';
import { Appointment } from '../../types/database';
import { useAppSelector } from '../../hooks/useRedux';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatAppointmentDate } from '../../utils/dateUtils';

type DayAppointmentsRouteProp = RouteProp<AppointmentStackParamList, 'DayAppointments'>;

export const DayAppointmentsScreen: React.FC = () => {
  const route = useRoute<DayAppointmentsRouteProp>();
  const navigation = useNavigation<AppointmentScreenNavigationProp>();
  const { date } = route.params;
  const { appointments, loading } = useAppSelector(state => state.appointments);
  const [dayAppointments, setDayAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const filtered = appointments.filter(
      appointment => format(new Date(appointment.fecha), 'yyyy-MM-dd') === date
    );
    setDayAppointments(filtered.sort((a, b) => a.hora.localeCompare(b.hora)));
  }, [appointments, date]);

  const handleAppointmentPress = (appointmentId: string) => {
    navigation.navigate('AppointmentDetail', { appointmentId });
  };

  const handleNewAppointment = () => {
    navigation.navigate('NewAppointment', { appointmentId: undefined });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada':
        return COLORS.success;
      case 'pendiente':
        return COLORS.primary;
      case 'cancelada':
        return COLORS.error;
      default:
        return COLORS.gray;
    }
  };

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <TouchableOpacity
      style={styles.appointmentCard}
      onPress={() => handleAppointmentPress(item.id)}
    >
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{item.hora}</Text>
        <View style={[styles.status, { backgroundColor: getStatusColor(item.estado) }]} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.clientName}>Cliente #{item.id_cliente}</Text>
        <Text style={styles.service}>Servicio #{item.id_servicio}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {formatAppointmentDate(date)}
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleNewAppointment}
        >
          <Ionicons name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : dayAppointments.length > 0 ? (
        <FlatList
          data={dayAppointments}
          renderItem={renderAppointment}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay citas para este día</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleNewAppointment}
          >
            <Text style={styles.createButtonText}>Crear nueva cita</Text>
          </TouchableOpacity>
        </View>
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    textTransform: 'capitalize',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  status: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  detailsContainer: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  service: {
    fontSize: 14,
    color: COLORS.gray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
}); 