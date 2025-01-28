import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  useWindowDimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/common';
import { useAppSelector } from '../../hooks/useRedux';
import { Servicio } from '../../types/database';
import { formatCurrency } from '../../utils/format';
import { RootStackParamList } from '../../navigation/types';
import { HomeScreenNavigationProp } from '../../navigation/types/navigation-types';

type NavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;

interface Appointment {
  id: number;
  service: Servicio;
  date: string;
  time: string;
  staff: string;
}

const HomeScreen = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAppSelector(state => state.auth);
  const [refreshing, setRefreshing] = React.useState(false);
  const [featuredServices, setFeaturedServices] = React.useState<Servicio[]>([]);
  const [nextAppointment, setNextAppointment] = React.useState<Appointment | null>(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Aquí cargarías los datos frescos
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const getUserDisplayName = () => {
    if (user?.name) return user.name;
    return 'Cliente';
  };

  const renderServiceCard = (service: Servicio) => (
    <TouchableOpacity 
      key={service.id}
      style={styles.serviceCard}
      onPress={() => navigation.navigate('ServiceDetail', { 
        id: service.id.toString()
      })}
    >
      <Image
        source={{ 
          uri: service.imagen || 'https://placeholder.com/300x200'
        }}
        style={styles.serviceImage}
      />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{service.nombre}</Text>
        <Text style={styles.servicePrice}>{formatCurrency(service.precio)}</Text>
        <Text style={styles.serviceDuration}>
          <Ionicons name="time-outline" size={14} color={COLORS.gray} />
          {' '}{service.duracion} min
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderAppointmentCard = () => {
    if (!nextAppointment) return null;
    
    return (
      <TouchableOpacity 
        style={styles.appointmentCard}
        onPress={() => navigation.navigate('AppointmentDetail', { 
          id: nextAppointment.id.toString()
        })}
      >
        <View style={styles.appointmentInfo}>
          <Text style={styles.appointmentDate}>Mañana, 2:00 PM</Text>
          <Text style={styles.appointmentService}>Corte de Cabello</Text>
          <Text style={styles.appointmentStaff}>con María García</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header con saludo personalizado */}
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>
            ¡Bienvenido, {getUserDisplayName()}! 👋
          </Text>
          <Text style={styles.subGreeting}>
            ¿Qué servicio te gustaría agendar hoy?
          </Text>
        </View>
      </View>

      {/* Sección de acciones rápidas */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.mainAction}
          onPress={() => navigation.navigate('NewAppointment' as never)}
        >
          <Ionicons name="calendar" size={24} color={COLORS.white} />
          <Text style={styles.mainActionText}>Agendar Cita</Text>
        </TouchableOpacity>

        <View style={styles.secondaryActions}>
          <TouchableOpacity 
            style={styles.secondaryAction}
            onPress={() => navigation.navigate('ServiceList')}
          >
            <Ionicons name="cut" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Servicios</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryAction}
            onPress={() => navigation.navigate('AppointmentList')}
          >
            <Ionicons name="time" size={24} color={COLORS.primary} />
            <Text style={styles.actionText}>Mis Citas</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Próxima cita si existe */}
      {nextAppointment && (
        <View style={styles.nextAppointment}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tu próxima cita</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AppointmentList')}>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          
          {renderAppointmentCard()}
        </View>
      )}

      {/* Servicios destacados */}
      <View style={styles.featuredServices}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Servicios Destacados</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ServiceList')}>
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesScroll}
        >
          {featuredServices.map(renderServiceCard)}
        </ScrollView>
      </View>

      {/* Promociones o Anuncios */}
      <View style={styles.promotions}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Promociones</Text>
        </View>
        <TouchableOpacity style={styles.promotionCard}>
          <Image
            source={{ uri: 'https://placeholder.com/600x300' }}
            style={styles.promotionImage}
          />
          <View style={styles.promotionOverlay}>
            <Text style={styles.promotionTitle}>20% de descuento</Text>
            <Text style={styles.promotionSubtitle}>en tu primer servicio</Text>
          </View>
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
  header: {
    padding: 20,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  welcomeSection: {
    marginTop: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
  },
  quickActions: {
    padding: 20,
    marginTop: -30,
  },
  mainAction: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  mainActionText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    color: COLORS.text,
    marginTop: 8,
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  seeAll: {
    color: COLORS.primary,
    fontSize: 14,
  },
  nextAppointment: {
    marginVertical: 20,
  },
  appointmentCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentDate: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  appointmentService: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 2,
  },
  appointmentStaff: {
    fontSize: 12,
    color: COLORS.gray,
  },
  featuredServices: {
    marginVertical: 20,
  },
  servicesScroll: {
    paddingHorizontal: 15,
  },
  serviceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    width: 200,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  serviceInfo: {
    padding: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 12,
    color: COLORS.gray,
  },
  promotions: {
    marginVertical: 20,
    paddingBottom: 20,
  },
  promotionCard: {
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  promotionImage: {
    width: '100%',
    height: 150,
  },
  promotionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promotionTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  promotionSubtitle: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default HomeScreen;