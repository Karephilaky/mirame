import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/common';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../navigation/types';
import { useAppSelector } from '../../hooks/useRedux';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const EmployeeHomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAppSelector(state => state.auth);
  const { appointments } = useAppSelector(state => state.appointments);
  const [refreshing, setRefreshing] = React.useState(false);

  const todayAppointments = appointments.filter(
    app => new Date(app.fecha).toDateString() === new Date().toDateString()
  );

  const onRefresh = async () => {
    setRefreshing(true);
    // Aquí irían las llamadas para recargar los datos
    setRefreshing(false);
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

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola!</Text>
          <Text style={styles.userName}>{user?.nombre}</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle-outline" size={40} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Estadísticas del día */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todayAppointments.length}</Text>
          <Text style={styles.statLabel}>Citas Hoy</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {todayAppointments.filter(a => a.estado === 'completada').length}
          </Text>
          <Text style={styles.statLabel}>Completadas</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {todayAppointments.filter(a => a.estado === 'pendiente').length}
          </Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
      </View>

      {/* Próximas citas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximas Citas</Text>
        {todayAppointments.length > 0 ? (
          todayAppointments.map(appointment => (
            <TouchableOpacity
              key={appointment.id}
              style={styles.appointmentCard}
              onPress={() => navigation.navigate('AppointmentDetail', { appointmentId: appointment.id })}
            >
              <View style={styles.timeContainer}>
                <Text style={styles.time}>{appointment.hora}</Text>
                <View style={[styles.status, { backgroundColor: getStatusColor(appointment.estado) }]} />
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.clientName}>Cliente #{appointment.id_cliente}</Text>
                <Text style={styles.service}>Servicio #{appointment.id_servicio}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color={COLORS.gray} />
            <Text style={styles.emptyText}>No hay citas programadas para hoy</Text>
          </View>
        )}
      </View>

      {/* Acciones rápidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
            onPress={() => navigation.navigate('NewAppointment', {})}
          >
            <Ionicons name="calendar" size={24} color={COLORS.white} />
            <Text style={styles.actionText}>Nueva Cita</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#4ECDC4' }]}
            onPress={() => navigation.navigate('Appointments')}
          >
            <Ionicons name="time" size={24} color={COLORS.white} />
            <Text style={styles.actionText}>Ver Agenda</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    padding: 20,
    backgroundColor: COLORS.white,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.gray,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  timeContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  status: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  appointmentInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  service: {
    fontSize: 14,
    color: COLORS.gray,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    color: COLORS.gray,
    marginTop: 8,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default EmployeeHomeScreen; 