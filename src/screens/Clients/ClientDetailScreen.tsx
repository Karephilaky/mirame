import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, commonStyles } from '../../styles/common';

interface ClientDetail {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  totalVisits: number;
  totalSpent: number;
  favoriteServices: string[];
  notes: string;
}

const ClientDetailScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resumen' | 'citas' | 'notas' | 'documentos'>('resumen');
  
  // Datos de ejemplo
  const clientData: ClientDetail = {
    id: '1',
    name: 'Ana María Vásquez',
    phone: '+593 98 457 2898',
    email: 'ana.vasquez@email.com',
    lastVisit: '15 de marzo, 2024',
    totalVisits: 8,
    totalSpent: 240.50,
    favoriteServices: ['Corte de cabello', 'Tinte', 'Manicure'],
    notes: 'Cliente regular desde 2023. Prefiere citas en la mañana.'
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'resumen':
        return (
          <View style={styles.tabContent}>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{clientData.totalVisits}</Text>
                <Text style={styles.statLabel}>Visitas</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>${clientData.totalSpent}</Text>
                <Text style={styles.statLabel}>Total gastado</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Servicios favoritos</Text>
              {clientData.favoriteServices.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      // Implementar otros tabs según necesidad
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{clientData.name[0]}</Text>
          </View>
          <Text style={styles.clientName}>{clientData.name}</Text>
          <Text style={styles.lastVisit}>Última visita: {clientData.lastVisit}</Text>
        </View>
      </View>

      <View style={styles.contactInfo}>
        <TouchableOpacity style={styles.contactItem}>
          <Ionicons name="call-outline" size={20} color={COLORS.primary} />
          <Text style={styles.contactText}>{clientData.phone}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactItem}>
          <Ionicons name="mail-outline" size={20} color={COLORS.primary} />
          <Text style={styles.contactText}>{clientData.email}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {(['resumen', 'citas', 'notas', 'documentos'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: COLORS.primary }]}>
          <Ionicons name="calendar" size={24} color={COLORS.white} />
          <Text style={styles.actionButtonText}>Nueva Cita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: COLORS.secondary }]}>
          <Ionicons name="create" size={24} color={COLORS.white} />
          <Text style={styles.actionButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  clientName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  lastVisit: {
    fontSize: 14,
    color: COLORS.white + 'CC',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: -20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 4,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    marginLeft: 8,
    color: COLORS.text,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  serviceText: {
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ClientDetailScreen; 