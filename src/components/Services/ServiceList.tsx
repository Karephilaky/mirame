import React from 'react';
import { View, FlatList } from 'react-native';
import { Servicio } from '../../types/database';
import { ServiceCard } from './ServiceCard';

interface ServiceListProps {
  services: Servicio[];
  onSelectService?: (service: Servicio) => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({ services, onSelectService }) => {
  return (
    <FlatList
      data={services}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ServiceCard
          service={item}
          onPress={() => onSelectService?.(item)}
        />
      )}
    />
  );
}; 