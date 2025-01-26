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

const ClientHomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAppSelector(state => state.auth);
  const { appointments } = useAppSelector(state => state.appointments);
  const [refreshing, setRefreshing] = React.useState(false);

  const myAppointments = appointments.filter(app => app.id_cliente === user?.id);
  const upcomingAppointments = myAppointments.filter(
    app => new Date(app.fecha) >= new Date()
  );

  const onRefresh = async () => {
    setRefreshing(true);
    // Aquí irían las llamadas para recargar los datos
    setRefreshing(false);
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

      {/* Próxima cita */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tu Próxima Cita</Text>
        {upcomingAppointments.length > 0 ? (
          <View style={styles.nextAppointmentCard}>
            <Text style={styles.dateText}>
              {format(new Date(upcomingAppointments[0].fecha), 'EEEE d MMMM', { locale: es })}
            </Text>
            <Text style={styles.timeText}>{upcomingAppointments[0].hora}</Text>
            <Text style={styles.serviceText}>Servicio: {upcomingAppointments[0].id_servicio}</Text>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => navigation.navigate('AppointmentDetail', { 
                appointmentId: upcomingAppointments[0].id 
              })}
            >
              <Text style={styles.viewButtonText}>Ver Detalles</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No tienes citas programadas</Text>
            <TouchableOpacity
              style={styles.scheduleButton}
              onPress={() => navigation.navigate('NewAppointment', {})}
            >
              <Text style={styles.scheduleButtonText}>Agendar Cita</Text>
            </TouchableOpacity>
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
            onPress={() => navigation.navigate('Services')}
          >
            <Ionicons name="cut" size={24} color={COLORS.white} />
            <Text style={styles.actionText}>Servicios</Text>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  nextAppointmentCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 16,
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: 16,
    marginBottom: 16,
  },
  scheduleButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  scheduleButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
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

export default ClientHomeScreen; 