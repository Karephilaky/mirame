import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/common';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../navigation/types';
import { Servicio, Empleado, Cita } from '../../types/database';
import { Card } from '../../components/common/Card';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { servicesApi } from '../../services/api/services.service';
import { employeesApi } from '../../services/api/employees.service';
import { appointmentsApi } from '../../services/api/appointments.service';
import { fetchServices } from '../../store/slices/servicesSlice';
import { Appointment } from '../../types/api.types';

const ClientHomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { items: services } = useAppSelector(state => state.services);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [employees, setEmployees] = useState<Empleado[]>([]);
  const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setError(null);
      setLoading(true);

      // Cargar servicios usando Redux
      await dispatch(fetchServices()).unwrap();

      // Cargar empleados
      const employeesResponse = await employeesApi.getEmployees();
      setEmployees(employeesResponse);

      // Cargar próxima cita del cliente
      if (user?.id) {
        const appointments = await appointmentsApi.getUserAppointments(user.id.toString());
        const upcoming = appointments.find(cita => 
          new Date(cita.date) >= new Date() && 
          ['pending', 'confirmed'].includes(cita.status)
        );
        setNextAppointment(upcoming || null);
      }
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los datos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBookAppointment = () => {
    if (!services.length) {
      Alert.alert('No hay servicios disponibles', 'Por favor, intenta más tarde.');
      return;
    }
    if (!employees.length) {
      Alert.alert('No hay profesionales disponibles', 'Por favor, intenta más tarde.');
      return;
    }
    navigation.navigate('ServiceList');
  };

  const renderServiceCard = (service: Servicio) => {
    // Asegurarse de que el ID sea un string al navegar
    const serviceId = typeof service.id === 'number' ? service.id.toString() : service.id;
    
    return (
      <TouchableOpacity 
        key={serviceId}
        style={styles.serviceCard}
        onPress={() => navigation.navigate('ServiceDetail', { 
          id: service.id.toString()
        })}
      >
        <Text style={styles.serviceName}>{service.nombre}</Text>
        <Text style={styles.servicePrice}>
          ${service.precio.toFixed(2)}
        </Text>
        <Text style={styles.serviceDuration}>
          {service.duracion} minutos
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={loadData}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola, {user?.name?.split(' ')[0]}!</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle-outline" size={40} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Próxima Cita */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Tu Próxima Cita</Text>
        {nextAppointment ? (
          <View>
            <Text style={styles.appointmentDate}>
              {new Date(nextAppointment.date).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <Text style={styles.appointmentTime}>Hora: {nextAppointment.time}</Text>
            <Text style={styles.appointmentStatus}>
              Estado: {nextAppointment.status.charAt(0).toUpperCase() + nextAppointment.status.slice(1)}
            </Text>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No tienes citas programadas
            </Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={handleBookAppointment}
            >
              <Text style={styles.buttonText}>Agendar Cita</Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>

      {/* Servicios */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Servicios Disponibles</Text>
        {services.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {services.map(service => renderServiceCard(service))}
          </ScrollView>
        ) : (
          <Text style={styles.emptyStateText}>
            No hay servicios disponibles en este momento
          </Text>
        )}
      </Card>

      {/* Profesionales */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Nuestros Profesionales</Text>
        {employees.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {employees.map(empleado => (
              <View key={empleado.id} style={styles.employeeCard}>
                <View style={styles.employeeAvatar}>
                  <Ionicons name="person" size={30} color={COLORS.gray} />
                </View>
                <Text style={styles.employeeName}>{empleado.nombre}</Text>
                <Text style={styles.employeeSpecialty}>
                  {empleado.especialidad}
                </Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.emptyStateText}>
            No hay profesionales disponibles en este momento
          </Text>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  profileButton: {
    padding: 5,
  },
  section: {
    margin: 15,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: COLORS.text,
  },
  serviceCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  serviceDuration: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
  },
  employeeCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  employeeAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  employeeName: {
    fontSize: 14,
    textAlign: 'center',
  },
  employeeSpecialty: {
    fontSize: 12,
    color: COLORS.gray,
  },
  emptyState: {
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '500',
  },
  appointmentDate: {
    fontSize: 16,
    marginBottom: 5,
  },
  appointmentTime: {
    fontSize: 14,
    color: COLORS.gray,
  },
  appointmentStatus: {
    fontSize: 14,
    color: COLORS.gray,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    margin: 15,
  },
});

export default ClientHomeScreen; 