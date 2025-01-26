import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useServices } from '../../hooks/useServices';
import ServiceCard from '../../components/ServiceCard';
import LoadingScreen from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import { COLORS } from '../../styles/common';

const ServiceListScreen = () => {
  const { services, loading, error, refetchServices } = useServices();

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onRetry={refetchServices} />;

  return (
    <View style={styles.container}>
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
});

export default ServiceListScreen; 