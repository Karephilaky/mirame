import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import { COLORS } from '../../styles/common';
import { useServices } from '../../hooks/useServices';
import ServiceCard from '../../components/ServiceCard';
import LoadingScreen from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';

const HomeScreen = () => {
  const { services, loading, error, refetchServices } = useServices();

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onRetry={refetchServices} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        renderItem={({ item }) => <ServiceCard service={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetchServices}
            colors={[COLORS.primary]}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
});

export default HomeScreen;