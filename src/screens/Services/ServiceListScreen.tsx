import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import { COLORS } from '../../styles/common';
import { Service } from '../../types/api.types';
import { appointmentsApi } from '../../services/api/appointments.service';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

const ServiceListScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await appointmentsApi.getServices();
      setServices(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los servicios');
    } finally {
      setLoading(false);
    }
  };

  const handleServicePress = (service: Service) => {
    navigation.navigate('ServiceDetail', { serviceId: service.id.toString() });
  };

  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuestros Servicios</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => handleServicePress(item)}
          >
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.serviceDescription}>{item.description}</Text>
            <View style={styles.serviceInfo}>
              <Text style={styles.servicePrice}>${item.price}</Text>
              <Text style={styles.serviceDuration}>{item.duration} min</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    padding: 20,
  },
  listContent: {
    padding: 16,
  },
  serviceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 12,
  },
  serviceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  serviceDuration: {
    fontSize: 14,
    color: COLORS.gray,
  },
});

export default ServiceListScreen; 