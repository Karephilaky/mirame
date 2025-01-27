import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../styles/common';
import { Ionicons } from '@expo/vector-icons';

const AdminDashboard = () => {
  const stats = [
    { 
      title: 'Citas Hoy', 
      value: '12', 
      icon: 'calendar-outline' as const, 
      color: COLORS.primary 
    },
    { 
      title: 'Empleados', 
      value: '8', 
      icon: 'people-outline' as const, 
      color: COLORS.success 
    },
    { 
      title: 'Servicios', 
      value: '24', 
      icon: 'cut-outline' as const, 
      color: COLORS.warning 
    },
    { 
      title: 'Ingresos', 
      value: '$2,450', 
      icon: 'cash-outline' as const, 
      color: COLORS.info 
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panel de Administración</Text>
        <Text style={styles.subtitle}>Resumen del Negocio</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <TouchableOpacity key={index} style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: stat.color }]}>
              <Ionicons name={stat.icon} size={24} color={COLORS.white} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximas Citas</Text>
        <Text style={styles.emptyText}>No hay citas programadas</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actividad Reciente</Text>
        <Text style={styles.emptyText}>No hay actividad reciente</Text>
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
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 14,
    color: COLORS.gray,
  },
  section: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default AdminDashboard; 