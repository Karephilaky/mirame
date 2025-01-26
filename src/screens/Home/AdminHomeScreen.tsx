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
import { AdminStackParamList } from '../../navigation/types';
import { useAppSelector } from '../../hooks/useRedux';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigation/types';

type AdminScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList>,
  StackNavigationProp<AdminStackParamList>
>;

const AdminHomeScreen: React.FC = () => {
  const navigation = useNavigation<AdminScreenNavigationProp>();
  const { user } = useAppSelector(state => state.auth);
  const { appointments } = useAppSelector(state => state.appointments);
  const [refreshing, setRefreshing] = React.useState(false);

  const todayStats = {
    appointments: appointments.filter(app => 
      format(new Date(app.fecha), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
    ).length,
    revenue: appointments
      .filter(app => app.estado === 'completada')
      .reduce((acc, curr) => acc + (curr.monto || 0), 0),
    employees: 5,
    services: 12,
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Aquí irían las llamadas para recargar los datos
    setRefreshing(false);
  };

  const quickActions = [
    {
      id: '1',
      title: 'Empleados',
      icon: 'people',
      color: COLORS.primary,
      onPress: () => navigation.navigate('Admin', { screen: 'Employees' }),
    },
    {
      id: '2',
      title: 'Servicios',
      icon: 'cut',
      color: '#4ECDC4',
      onPress: () => navigation.navigate('Services'),
    },
    {
      id: '3',
      title: 'Reportes',
      icon: 'bar-chart',
      color: '#FF6B6B',
      onPress: () => navigation.navigate('Admin', { screen: 'Reports' }),
    },
    {
      id: '4',
      title: 'Configuración',
      icon: 'settings',
      color: '#45B7D1',
      onPress: () => navigation.navigate('Admin', { screen: 'Settings' }),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Bienvenido!</Text>
          <Text style={styles.userName}>{user?.nombre}</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle-outline" size={40} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Estadísticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todayStats.appointments}</Text>
          <Text style={styles.statLabel}>Citas Hoy</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>${todayStats.revenue}</Text>
          <Text style={styles.statLabel}>Ingresos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todayStats.employees}</Text>
          <Text style={styles.statLabel}>Empleados</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todayStats.services}</Text>
          <Text style={styles.statLabel}>Servicios</Text>
        </View>
      </View>

      {/* Acciones Rápidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.quickActions}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionButton, { backgroundColor: action.color }]}
              onPress={action.onPress}
            >
              <Ionicons name={action.icon as any} size={24} color={COLORS.white} />
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Actividad Reciente */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Actividad Reciente</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Admin', { screen: 'Reports' })}
          >
            <Text style={styles.seeAllText}>Ver todo</Text>
          </TouchableOpacity>
        </View>
        {/* Aquí iría la lista de actividades recientes */}
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
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
  },
  statCard: {
    width: '47%',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    color: COLORS.white,
    marginTop: 8,
    fontWeight: '500',
  },
  seeAllText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default AdminHomeScreen; 