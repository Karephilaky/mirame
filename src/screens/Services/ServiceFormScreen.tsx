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
import { addService, updateService } from '../../store/slices/servicesSlice';
import { Servicio, CATEGORIAS_SERVICIOS } from '../../types/database';
import servicesApi from '../../api/services';
import { useLoading } from '../../hooks/useLoading';

type ServiceFormRouteProp = RouteProp<ServiceStackParamList, 'ServiceForm'>;

interface ServiceFormData {
  nombre: string;
  descripcion: string;
  duracion: string;
  precio: string;
  activo: boolean;
  categoria: string;
}

const defaultFormValues: ServiceFormData = {
  nombre: '',
  descripcion: '',
  duracion: '',
  precio: '',
  activo: true,
  categoria: '8', // Otros por defecto
};

const ServiceFormScreen: React.FC = () => {
  const route = useRoute<ServiceFormRouteProp>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { withLoading, loading } = useLoading();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const isEditing = route.params?.serviceId != null;

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<ServiceFormData>({
    defaultValues: defaultFormValues
  });

  const selectedCategoria = watch('categoria');

  useEffect(() => {
    if (isEditing) {
      loadServiceData();
    }
  }, [isEditing]);

  const loadServiceData = async () => {
    if (!route.params?.serviceId) return;

    const service = await withLoading(
      () => servicesApi.getById(route.params.serviceId!),
      'No se pudo cargar la información del servicio'
    );
    
    if (service) {
      setValue('nombre', service.nombre);
      setValue('descripcion', service.descripcion);
      setValue('duracion', service.duracion);
      setValue('precio', service.precio.toString());
      setValue('activo', service.activo);
      setValue('categoria', service.categoria);
    }
  };

  const validateDuration = (value: string) => {
    const durationRegex = /^(\d+)(min|h)$/;
    if (!durationRegex.test(value)) {
      return 'Formato inválido. Use "min" o "h" (ej: 45min, 1h)';
    }
    return true;
  };

  const onSubmit = async (data: ServiceFormData) => {
    const serviceData: Partial<Servicio> = {
      ...data,
      precio: parseFloat(data.precio),
    };

    try {
      if (isEditing && route.params?.serviceId) {
        const updatedService = await withLoading(
          () => servicesApi.update(route.params.serviceId!, serviceData),
          'No se pudo actualizar el servicio'
        );
        if (updatedService) {
          dispatch(updateService(updatedService));
          navigation.goBack();
        }
      } else {
        const newService = await withLoading(
          () => servicesApi.create(serviceData),
          'No se pudo crear el servicio'
        );
        if (newService) {
          dispatch(addService(newService));
          navigation.goBack();
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un error al guardar el servicio');
    }
  };

  const renderCategoryModal = () => (
    <Modal
      visible={showCategoryModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowCategoryModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Seleccionar Categoría</Text>
            <TouchableOpacity
              onPress={() => setShowCategoryModal(false)}
            >
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {CATEGORIAS_SERVICIOS.map(categoria => (
              <TouchableOpacity
                key={categoria.id}
                style={[
                  styles.categoryItem,
                  selectedCategoria === categoria.id && styles.selectedCategoryItem
                ]}
                onPress={() => {
                  setValue('categoria', categoria.id);
                  setShowCategoryModal(false);
                }}
              >
                <View style={[styles.categoryColor, { backgroundColor: categoria.color }]} />
                <Text style={styles.categoryName}>{categoria.nombre}</Text>
                {selectedCategoria === categoria.id && (
                  <Ionicons name="checkmark" size={24} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

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
          {isEditing ? 'Editar Servicio' : 'Nuevo Servicio'}
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
                  value={value}
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
                  value={value}
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
            name="categoria"
            rules={{ required: 'Este campo es requerido' }}
            render={({ field: { value } }) => (
              <TouchableOpacity
                style={styles.categorySelector}
                onPress={() => setShowCategoryModal(true)}
              >
                <View style={styles.selectedCategory}>
                  <View 
                    style={[
                      styles.categoryColor,
                      { backgroundColor: CATEGORIAS_SERVICIOS.find(c => c.id === value)?.color }
                    ]} 
                  />
                  <Text style={styles.categoryName}>
                    {CATEGORIAS_SERVICIOS.find(c => c.id === value)?.nombre}
                  </Text>
                </View>
                <Ionicons name="chevron-down" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            )}
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
            {isEditing ? 'Actualizar' : 'Crear'} Servicio
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
});

export default ServiceFormScreen; 