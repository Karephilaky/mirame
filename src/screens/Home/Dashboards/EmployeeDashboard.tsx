import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../styles/common';
import { Ionicons } from '@expo/vector-icons';

const EmployeeDashboard = () => {
  const stats = [
    { 
      title: 'Citas Hoy', 
      value: '5', 
      icon: 'calendar-outline' as const, 
      color: COLORS.primary 
    },
    { 
      title: 'Clientes', 
      value: '28', 
      icon: 'people-outline' as const, 
      color: COLORS.info 
    },
    { 
      title: 'Servicios', 
      value: '12', 
      icon: 'cut-outline' as const, 
      color: COLORS.warning 
    },
    { 
      title: 'Completadas', 
      value: '156', 
      icon: 'checkmark-circle-outline' as const, 
      color: COLORS.success 
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Portal de Empleados</Text>
        <Text style={styles.subtitle}>Mi Panel de Control</Text>
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Próximas Citas</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentTime}>
            <Ionicons name="time-outline" size={20} color={COLORS.primary} />
            <Text style={styles.timeText}>10:00 AM</Text>
          </View>
          <View style={styles.appointmentInfo}>
            <Text style={styles.clientName}>María González</Text>
            <Text style={styles.serviceText}>Corte de cabello</Text>
          </View>
          <TouchableOpacity style={styles.statusButton}>
            <Text style={styles.statusText}>Pendiente</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mi Rendimiento</Text>
        <View style={styles.performanceStats}>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>98%</Text>
            <Text style={styles.performanceLabel}>Satisfacción</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>45</Text>
            <Text style={styles.performanceLabel}>Citas/Mes</Text>
          </View>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>4.9</Text>
            <Text style={styles.performanceLabel}>Calificación</Text>
          </View>
        </View>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  seeAllText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: COLORS.background,
    borderRadius: 12,
  },
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 5,
    color: COLORS.primary,
    fontWeight: '600',
  },
  appointmentInfo: {
    flex: 1,
    marginLeft: 15,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  serviceText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  statusButton: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  performanceItem: {
    alignItems: 'center',
  },
  performanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  performanceLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
  },
});

export default EmployeeDashboard; 