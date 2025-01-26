import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../styles/common';
import { Servicio, CATEGORIAS_SERVICIOS } from '../../types/database';
import { Ionicons } from '@expo/vector-icons';

interface ServiceStatsProps {
  services: Servicio[];
}

const ServiceStats: React.FC<ServiceStatsProps> = ({ services }) => {
  const totalServices = services.length;
  const activeServices = services.filter(s => s.activo).length;
  const totalValue = services.reduce((sum, service) => sum + service.precio, 0);
  
  const servicesByCategory = CATEGORIAS_SERVICIOS.map(categoria => ({
    ...categoria,
    count: services.filter(s => s.categoria === categoria.id).length,
    value: services
      .filter(s => s.categoria === categoria.id)
      .reduce((sum, service) => sum + service.precio, 0),
  }));

  const averagePrice = totalServices > 0 
    ? (totalValue / totalServices).toFixed(2)
    : '0.00';

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.statCard}>
          <Ionicons name="apps" size={24} color={COLORS.primary} />
          <Text style={styles.statValue}>{totalServices}</Text>
          <Text style={styles.statLabel}>Total Servicios</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
          <Text style={styles.statValue}>{activeServices}</Text>
          <Text style={styles.statLabel}>Servicios Activos</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="cash" size={24} color={COLORS.primary} />
          <Text style={styles.statValue}>${averagePrice}</Text>
          <Text style={styles.statLabel}>Precio Promedio</Text>
        </View>
      </ScrollView>

      <View style={styles.categoryStats}>
        <Text style={styles.sectionTitle}>Servicios por Categoría</Text>
        <ScrollView>
          {servicesByCategory
            .filter(cat => cat.count > 0)
            .sort((a, b) => b.count - a.count)
            .map(categoria => (
              <View key={categoria.id} style={styles.categoryRow}>
                <View style={styles.categoryInfo}>
                  <View 
                    style={[
                      styles.categoryDot, 
                      { backgroundColor: categoria.color }
                    ]} 
                  />
                  <Text style={styles.categoryName}>{categoria.nombre}</Text>
                </View>
                <View style={styles.categoryMetrics}>
                  <Text style={styles.categoryCount}>{categoria.count}</Text>
                  <Text style={styles.categoryValue}>
                    ${categoria.value.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 120,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
  categoryStats: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    color: COLORS.text,
  },
  categoryMetrics: {
    alignItems: 'flex-end',
  },
  categoryCount: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  categoryValue: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
});

export default ServiceStats; 