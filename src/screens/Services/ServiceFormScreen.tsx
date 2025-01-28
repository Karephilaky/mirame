import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Modal
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/common';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { ServiceStackParamList } from '../../navigation/types';
import { useAppDispatch } from '../../hooks/useRedux';
import { 
  createService, 
  updateService 
} from '../../store/slices/servicesSlice';
import { Servicio, CATEGORIAS_SERVICIOS } from '../../types/database';
import servicesApi from '../../services/api/api/services';
import { useLoading } from '../../hooks/useLoading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ServiceFormData } from '../../types/forms';

type ServiceFormScreenProps = NativeStackScreenProps<ServiceStackParamList, 'ServiceForm'>;

const ServiceFormScreen: React.FC<ServiceFormScreenProps> = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const { withLoading, loading } = useLoading();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { serviceId } = route.params || {};
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<ServiceFormData>({
    defaultValues: {
      nombre: '',
      descripcion: '',
      duracion: 30,
      precio: 0,
      activo: true,
      categoria_id: 8,
    }
  });

  const [selectedCategoria, setSelectedCategoria] = useState<number>(8);

  useEffect(() => {
    if (serviceId) {
      loadServiceData();
    }
  }, [serviceId]);

  const loadServiceData = async () => {
    if (!serviceId) return;
    
    const service = await withLoading(
      () => servicesApi.getServiceById(serviceId.toString()),
      'No se pudo cargar la información del servicio'
    );

    if (service) {
      setValue('nombre', service.nombre);
      setValue('descripcion', service.descripcion);
      setValue('duracion', service.duracion);
      setValue('precio', Number(service.precio));
      setValue('activo', service.activo);
      setValue('categoria_id', Number(service.categoria_id));
    }
  };

  const validateDuration = (value: string) => {
    const durationRegex = /^(\d+)(min|h)$/;
    if (!durationRegex.test(value)) {
      return 'Formato inválido. Use "min" o "h" (ej: 45min, 1h)';
    }
    return true;
  };

  const validateDuracion = (value: string) => {
    const duracion = Number(value);
    return !isNaN(duracion) && duracion >= 15 && duracion <= 180;
  };

  const validatePrecio = (value: string) => {
    const precio = Number(value);
    return !isNaN(precio) && precio > 0 && precio <= 1000;
  };

  const onSubmit = async (data: ServiceFormData) => {
    try {
      setIsLoading(true);
      if (serviceId) {
        await dispatch(updateService({ 
          id: serviceId.toString(),
          data 
        })).unwrap();
      } else {
        await dispatch(createService(data)).unwrap();
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el servicio');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCategoryModal = () => (
    <Modal
      visible={showCategoryModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowCategoryModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {CATEGORIAS_SERVICIOS.map(categoria => {
            const categoriaId = Number(categoria.id);
            const currentSelectedId = Number(selectedCategoria);
            const isSelected = currentSelectedId === categoriaId;
            
            return (
              <TouchableOpacity
                key={categoriaId}
                style={[
                  styles.categoryOption,
                  isSelected && styles.selectedOption
                ]}
                onPress={() => {
                  setSelectedCategoria(categoriaId);
                  setValue('categoria_id', categoriaId);
                  setShowCategoryModal(false);
                }}
              >
                <View 
                  style={[
                    styles.categoryColor,
                    { backgroundColor: categoria.color }
                  ]} 
                />
                <Text style={styles.categoryText}>{categoria.nombre}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
  const getCategoriaName = (id: number) => {
    const categoria = CATEGORIAS_SERVICIOS.find(cat => cat.id === id.toString());
    return categoria ? categoria.nombre : '';
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>
          {serviceId ? 'Editar Servicio' : 'Nuevo Servicio'}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre del servicio</Text>
          <Controller
            control={control}
            name="nombre"
            rules={{ required: 'Este campo es requerido' }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="Ej: Corte de cabello"
                error={!!errors.nombre}
              />
            )}
          />
          {errors.nombre && (
            <Text style={styles.errorText}>{errors.nombre.message}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Descripción</Text>
          <Controller
            control={control}
            name="descripcion"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, styles.textArea]}
                value={value}
                onChangeText={onChange}
                placeholder="Describe el servicio..."
                multiline
                numberOfLines={4}
              />
            )}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Duración</Text>
            <Controller
              control={control}
              name="duracion"
              rules={{ required: 'Este campo es requerido' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value.toString()}
                  onChangeText={onChange}
                  placeholder="Ej: 45min"
                  error={!!errors.duracion}
                />
              )}
            />
          </View>

          <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Precio</Text>
            <Controller
              control={control}
              name="precio"
              rules={{ 
                required: 'Este campo es requerido',
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: 'Ingrese un precio válido'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  value={value.toString()}
                  onChangeText={onChange}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  error={!!errors.precio}
                />
              )}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Categoría</Text>
          <Controller
            control={control}
            name="categoria_id"
            rules={{ required: 'Este campo es requerido' }}
            render={({ field: { value, onChange } }) => {
              const categoriaId = Number(value);
              const categoria = CATEGORIAS_SERVICIOS.find(c => Number(c.id) === categoriaId);
              
              return (
                <TouchableOpacity
                  style={styles.categorySelector}
                  onPress={() => setShowCategoryModal(true)}
                >
                  <View style={styles.selectedCategory}>
                    <View 
                      style={[
                        styles.categoryColor,
                        { backgroundColor: categoria?.color }
                      ]} 
                    />
                    <Text style={styles.categoryName}>
                      {categoria?.nombre || ''}
                    </Text>
                  </View>
                  <Ionicons name="chevron-down" size={24} color={COLORS.gray} />
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Servicio activo</Text>
          <Controller
            control={control}
            name="activo"
            render={({ field: { onChange, value } }) => (
              <Switch
                value={value}
                onValueChange={onChange}
                trackColor={{ false: COLORS.gray, true: COLORS.primary }}
              />
            )}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {serviceId ? 'Actualizar' : 'Crear'} Servicio
          </Text>
        </TouchableOpacity>
      </View>

      {renderCategoryModal()}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedCategoryItem: {
    backgroundColor: COLORS.primary + '10',
  },
  categoryColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  selectedOption: {
    backgroundColor: COLORS.primary + '10',
  },
  categoryText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
});

export default ServiceFormScreen; 