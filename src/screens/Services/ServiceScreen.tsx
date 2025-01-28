import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  Switch,
  Modal,
  FlatList,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, commonStyles } from '../../styles/common';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { 
  fetchServices, 
  deleteService, 
  updateService 
} from '../../store/slices/servicesSlice';
import { Servicio, CATEGORIAS_SERVICIOS } from '../../types/database';
import { useNavigation } from '@react-navigation/native';
import { ServiceStackParamList } from '../../navigation/types';
import servicesApi from '../../services/api/api/services';
import ServiceStats from '../../components/Services/ServiceStats';
import { useLoadingState } from '../../hooks/useLoadingState';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SortOption = {
  id: string;
  label: string;
  value: keyof Servicio;
  icon: string;
  reverse?: boolean;
};

const SORT_OPTIONS: SortOption[] = [
  { id: '1', label: 'Nombre A-Z', value: 'nombre', icon: 'text' },
  { id: '2', label: 'Nombre Z-A', value: 'nombre', icon: 'text', reverse: true },
  { id: '3', label: 'Precio menor', value: 'precio', icon: 'cash' },
  { id: '4', label: 'Precio mayor', value: 'precio', icon: 'cash', reverse: true },
  { id: '5', label: 'Más recientes', value: 'creado_en', icon: 'time', reverse: true },
  { id: '6', label: 'Más antiguos', value: 'creado_en', icon: 'time' },
];

// Servicios de ejemplo para desarrollo
const mockServices: Servicio[] = [
  {
    id: 1,
    nombre: 'Corte de Cabello',
    descripcion: 'Corte básico',
    duracion: 30,
    precio: 200,
    activo: true,
    categoria_id: 1,
    creado_en: new Date(),
    actualizado_en: new Date(),
  },
  // ... más servicios de ejemplo
];

type ServiceScreenNavigationProp = NativeStackNavigationProp<ServiceStackParamList>;

interface ServicesApi {
  getServices: () => Promise<Servicio[]>;
  getServiceById: (id: string) => Promise<Servicio>;
  updateService: (id: string, data: Partial<Servicio>) => Promise<Servicio>;
  deleteService: (id: string) => Promise<void>;
  createService: (data: Partial<Servicio>) => Promise<Servicio>;
}

const ServiceScreen: React.FC = () => {
  const navigation = useNavigation<ServiceScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { items: services, loading, error } = useAppSelector(state => state.services);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSortModal, setShowSortModal] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>(SORT_OPTIONS[0]);
  const { withLoading } = useLoadingState();

  const sortServices = (services: Servicio[]) => {
    return [...services].sort((a, b) => {
      const aValue = Number(a[selectedSort.value]);
      const bValue = Number(b[selectedSort.value]);
      return selectedSort.reverse ? bValue - aValue : aValue - bValue;
    });
  };

  const filteredServices = services.filter(service => {
    const serviceCategoriaId = Number(service.categoria_id);
    return selectedCategory === null ? true : serviceCategoriaId === Number(selectedCategory);
  });

  const filteredAndSortedServices = sortServices(
    filteredServices
      .filter(service => 
        service.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.descripcion.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(service => 
        filterActive === null ? true : service.activo === filterActive
      )
  );

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleDeleteService = async (service: Servicio) => {
    try {
      await dispatch(deleteService(service.id.toString())).unwrap();
      // Mostrar mensaje de éxito
    } catch (error) {
      // Mostrar mensaje de error
    }
  };

  const handleUpdateService = async (service: Servicio) => {
    try {
      await dispatch(updateService({ 
        id: service.id.toString(), 
        data: service 
      })).unwrap();
      // Mostrar mensaje de éxito
    } catch (error) {
      // Mostrar mensaje de error
    }
  };

  const handleDuplicateService = async (service: Servicio) => {
    try {
      const duplicatedService = {
        nombre: `${service.nombre} (Copia)`,
        descripcion: service.descripcion,
        duracion: service.duracion,
        precio: service.precio,
        categoria_id: service.categoria_id,
        activo: true,
      };

      const newService = await servicesApi.createService(duplicatedService);
      if (newService) {
        dispatch(fetchServices());
        Alert.alert('Éxito', 'Servicio duplicado correctamente');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo duplicar el servicio');
    }
  };

  const handleNavigate = (screen: keyof ServiceStackParamList, params?: any) => {
    navigation.navigate(screen, params);
  };
  const getCategoriaColor = (categoriaId: number) => {
    const categoria = CATEGORIAS_SERVICIOS.find(cat => cat.id === String(categoriaId));
    return categoria?.color || COLORS.primary;
  };

  const handleServicePress = (service: Servicio) => {
    const serviceData = {
      ...service,
      id: Number(service.id),
      categoria_id: Number(service.categoria_id),
      precio: Number(service.precio),
      duracion: Number(service.duracion)
    };
    handleNavigate('ServiceForm', { serviceId: serviceData.id });
  };

  const handleCreateService = async () => {
    try {
      const defaultService: Partial<Servicio> = {
        nombre: '',
        descripcion: '',
        duracion: 30,
        precio: 0,
        categoria_id: 1,
        activo: true
      };
      await servicesApi.createService(defaultService);
      dispatch(fetchServices());
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el servicio');
    }
  };

  const renderServiceCard = (service: Servicio) => {
    const categoriaId = Number(service.categoria_id);
    const categoria = CATEGORIAS_SERVICIOS.find(cat => Number(cat.id) === categoriaId);
    
    return (
      <View key={Number(service.id)} style={styles.serviceCard}>
        <View style={styles.serviceHeader}>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.nombre}</Text>
            <Text style={styles.serviceDescription}>{service.descripcion}</Text>
            <View style={styles.categoryContainer}>
              <View 
                style={[
                  styles.categoryBadge,
                  { backgroundColor: categoria?.color + '20' }
                ]}
              >
                <Text 
                  style={[
                    styles.categoryText,
                    { color: categoria?.color }
                  ]}
                >
                  {categoria?.nombre}
                </Text>
              </View>
            </View>
          </View>
          <Switch
            value={service.activo}
            onValueChange={() => handleUpdateService(service)}
          />
        </View>
        <View style={styles.serviceFooter}>
          <Text style={styles.servicePrice}>${service.precio}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDuplicateService(service)}
            >
              <Ionicons name="copy-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleServicePress(service)}
            >
              <Ionicons name="create-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDeleteService(service)}
            >
              <Ionicons name="trash-outline" size={24} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderSortModal = () => (
    <Modal
      visible={showSortModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowSortModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Ordenar por</Text>
            <TouchableOpacity onPress={() => setShowSortModal(false)}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {SORT_OPTIONS.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.sortOption,
                  selectedSort.id === option.id && styles.selectedSortOption
                ]}
                onPress={() => {
                  setSelectedSort(option);
                  setShowSortModal(false);
                }}
              >
                <View style={styles.sortOptionLeft}>
                  <Ionicons 
                    name={option.icon as any} 
                    size={20} 
                    color={selectedSort.id === option.id ? COLORS.primary : COLORS.gray} 
                  />
                  <Text style={[
                    styles.sortOptionText,
                    selectedSort.id === option.id && styles.selectedSortOptionText
                  ]}>
                    {option.label}
                  </Text>
                </View>
                {selectedSort.id === option.id && (
                  <Ionicons name="checkmark" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const handleAddService = () => {
    navigation.navigate('ServiceForm', { serviceId: undefined });
  };

  const handleEditService = (serviceId: number) => {
    navigation.navigate('ServiceForm', { serviceId });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar servicios..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowSortModal(true)}
        >
          <Ionicons 
            name="funnel" 
            size={24} 
            color={COLORS.primary} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => {
            setFilterActive(current => {
              if (current === null) return true;
              if (current === true) return false;
              return null;
            });
          }}
        >
          <Ionicons 
            name="filter" 
            size={24} 
            color={filterActive !== null ? COLORS.primary : COLORS.gray} 
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddService}
      >
        <Ionicons name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );

  const renderCategoryFilters = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoryFiltersContainer}
    >
      <TouchableOpacity
        style={[
          styles.categoryChip,
          selectedCategory === null && styles.selectedCategoryChip
        ]}
        onPress={() => setSelectedCategory(null)}
      >
        <Text style={[
          styles.categoryChipText,
          selectedCategory === null && styles.selectedCategoryChipText
        ]}>
          Todos
        </Text>
      </TouchableOpacity>
      {CATEGORIAS_SERVICIOS.map(categoria => (
        <TouchableOpacity
          key={categoria.id}
          style={[
            styles.categoryChip,
            selectedCategory === categoria.id && styles.selectedCategoryChip,
            { backgroundColor: selectedCategory === categoria.id ? categoria.color + '20' : COLORS.background }
          ]}
          onPress={() => setSelectedCategory(
            selectedCategory === categoria.id ? null : categoria.id
          )}
        >
          <View style={[styles.categoryDot, { backgroundColor: categoria.color }]} />
          <Text style={[
            styles.categoryChipText,
            selectedCategory === categoria.id && { color: categoria.color }
          ]}>
            {categoria.nombre}
          </Text>
          <Text style={[
            styles.categoryCount,
            selectedCategory === categoria.id && { color: categoria.color }
          ]}>
            {services.filter(s => s.categoria_id === parseInt(categoria.id)).length}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="cut-outline" size={48} color={COLORS.gray} />
      <Text style={styles.emptyStateTitle}>No hay servicios</Text>
      <Text style={styles.emptyStateText}>
        {searchQuery 
          ? 'No se encontraron servicios que coincidan con tu búsqueda'
          : 'Comienza agregando tu primer servicio'}
      </Text>
      <TouchableOpacity
        style={styles.addServiceButton}
        onPress={() => navigation.navigate('ServiceForm', {})}
      >
        <Text style={styles.addServiceButtonText}>Agregar Servicio</Text>
      </TouchableOpacity>
    </View>
  );

  const onRefresh = async () => {
    // Aquí iría la llamada a la API para recargar servicios
    dispatch(fetchServices());
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Servicios</Text>
        {filterActive !== null && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>
              {filterActive ? 'Activos' : 'Inactivos'}
            </Text>
          </View>
        )}
      </View>

      {renderHeader()}
      {renderCategoryFilters()}

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <ScrollView style={styles.content}>
          <ServiceStats services={services} />
          <FlatList
            data={filteredAndSortedServices}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => renderServiceCard(item)}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={renderEmptyState}
          />
        </ScrollView>
      )}
      {renderSortModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  serviceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 12,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 12,
    padding: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  filterBadge: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  filterBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 24,
  },
  addServiceButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addServiceButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  categoryFiltersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: COLORS.background,
  },
  selectedCategoryChip: {
    backgroundColor: COLORS.primary + '20',
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoryChipText: {
    fontSize: 14,
    color: COLORS.text,
    marginRight: 4,
  },
  selectedCategoryChipText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  categoryCount: {
    fontSize: 12,
    color: COLORS.gray,
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalContent: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedSortOption: {
    backgroundColor: COLORS.primary + '10',
  },
  sortOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sortOptionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  selectedSortOptionText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});

export default ServiceScreen;