import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../../styles/common';
import { Ionicons } from '@expo/vector-icons';

const ClientDashboard = () => {
  const nextAppointment = {
    date: '15 Mar',
    time: '14:30',
    service: 'Corte de Cabello',
    stylist: 'Carlos Ruiz',
    status: 'Confirmada'
  };

  const recentServices = [
    {
      name: 'Tinte de Cabello',
      date: '1 Mar',
      price: '$45.00',
      image: 'https://example.com/service1.jpg'
    },
    {
      name: 'Manicure',
      date: '15 Feb',
      price: '$25.00',
      image: 'https://example.com/service2.jpg'
    }
  ];

  const promotions = [
    {
      title: '20% Descuento',
      description: 'En todos los servicios de color',
      validUntil: 'Válido hasta 31 Mar',
      color: COLORS.primary
    },
    {
      title: '2x1',
      description: 'En manicure y pedicure',
      validUntil: 'Válido hasta 20 Mar',
      color: COLORS.info
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Bienvenido de vuelta!</Text>
        <Text style={styles.subtitle}>¿Qué servicio te gustaría hoy?</Text>
      </View>

      {/* Próxima Cita */}
      {nextAppointment && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu Próxima Cita</Text>
          <View style={styles.appointmentCard}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{nextAppointment.date}</Text>
              <Text style={styles.timeText}>{nextAppointment.time}</Text>
            </View>
            <View style={styles.appointmentDetails}>
              <Text style={styles.serviceName}>{nextAppointment.service}</Text>
              <Text style={styles.stylistName}>con {nextAppointment.stylist}</Text>
              <View style={styles.statusContainer}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>{nextAppointment.status}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="calendar-outline" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Promociones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Promociones Especiales</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {promotions.map((promo, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.promoCard, { backgroundColor: promo.color }]}
            >
              <Text style={styles.promoTitle}>{promo.title}</Text>
              <Text style={styles.promoDescription}>{promo.description}</Text>
              <Text style={styles.promoValidity}>{promo.validUntil}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Servicios Recientes */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Servicios Recientes</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        {recentServices.map((service, index) => (
          <View key={index} style={styles.serviceCard}>
            <View style={styles.serviceImageContainer}>
              {service.image ? (
                <Image 
                  source={{ uri: service.image }} 
                  style={styles.serviceImage}
                  onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
                />
              ) : (
                <View style={[styles.serviceImage, styles.placeholderImage]}>
                  <Ionicons name="image-outline" size={24} color={COLORS.gray} />
                </View>
              )}
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDate}>{service.date}</Text>
            </View>
            <Text style={styles.servicePrice}>{service.price}</Text>
          </View>
        ))}
      </View>

      {/* Botón de Nueva Cita */}
      <TouchableOpacity style={styles.newAppointmentButton}>
        <Ionicons name="add-circle-outline" size={24} color={COLORS.white} />
        <Text style={styles.newAppointmentText}>Agendar Nueva Cita</Text>
      </TouchableOpacity>
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
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
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
    marginBottom: 15,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 15,
  },
  dateContainer: {
    alignItems: 'center',
    paddingRight: 15,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  timeText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
  },
  appointmentDetails: {
    flex: 1,
    paddingHorizontal: 15,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  stylistName: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.success,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoCard: {
    width: 200,
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
  },
  promoDescription: {
    fontSize: 14,
    color: COLORS.white,
    marginBottom: 10,
  },
  promoValidity: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.8,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  serviceImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  placeholderImage: {
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 15,
  },
  serviceDate: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  newAppointmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    margin: 10,
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
  },
  newAppointmentText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  seeAllText: {
    color: COLORS.primary,
    fontSize: 14,
  },
});

export default ClientDashboard; 