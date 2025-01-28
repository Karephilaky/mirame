import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ServiceStackParamList } from '../../navigation/types';
import { Servicio } from '../../types/database';

type ServiceDetailRouteProp = RouteProp<ServiceStackParamList, 'ServiceDetail'>;

const ServiceDetailScreen = () => {
  const route = useRoute<ServiceDetailRouteProp>();
  const { service } = route.params;

  return (
    <View>
      <Text>Detalles del Servicio {service.nombre}</Text>
    </View>
  );
};

export default ServiceDetailScreen; 