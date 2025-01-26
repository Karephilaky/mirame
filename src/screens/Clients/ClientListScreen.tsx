import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, commonStyles } from '../../styles/common';

interface Client {
  id: string;
  name: string;
  phone: string;
  initial: string;
  lastVisit: string;
}

const ClientListScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Datos de ejemplo
  const clients: Client[] = [
    { id: '1', name: 'Ana María Vásquez', phone: '+593 98 457 2898', initial: 'A', lastVisit: '2024-03-15' },
    { id: '2', name: 'Magdalena Moreno', phone: '+593 99 567 1234', initial: 'M', lastVisit: '2024-03-14' },
    { id: '3', name: 'Gina Guillén', phone: '+593 98 234 5678', initial: 'G', lastVisit: '2024-03-13' },
    { id: '4', name: 'Andrea Carlos Mora', phone: '+593 99 890 1234', initial: 'A', lastVisit: '2024-03-12' },
    { id: '5', name: 'Teresa María Mendoza', phone: '+593 98 567 8901', initial: 'T', lastVisit: '2024-03-11' },
  ];

  const renderClientItem = ({ item }: { item: Client }) => (
    <TouchableOpacity style={styles.clientCard}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{item.initial}</Text>
      </View>
      <View style={styles.clientInfo}>
        <Text style={styles.clientName}>{item.name}</Text>
        <Text style={styles.clientPhone}>{item.phone}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Lista de clientes</Text>
        <Text style={styles.subtitle}>Ver, añadir, editar y eliminar información del cliente</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar un nombre o número"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={clients}
        renderItem={renderClientItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: COLORS.background,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: COLORS.white,
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 80,
  },
  clientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  clientPhone: {
    fontSize: 14,
    color: COLORS.gray,
  },
  moreButton: {
    padding: 4,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default ClientListScreen; 