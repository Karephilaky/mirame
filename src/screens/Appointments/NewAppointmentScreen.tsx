import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar,
  Platform
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { AppointmentStackParamList, AppointmentScreenNavigationProp } from '../../navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { COLORS, commonStyles } from '../../styles/common';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Cliente, Servicio } from '../../types/database';

type NewAppointmentRouteProp = RouteProp<AppointmentStackParamList, 'NewAppointment'>;

interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
}

interface AppointmentForm {
  clientId: string;
  serviceId: string;
  date: Date;
  time: string;
  notes?: string;
}

const NewAppointmentScreen: React.FC = () => {
  const route = useRoute<NewAppointmentRouteProp>();
  const navigation = useNavigation<AppointmentScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [selectedService, setSelectedService] = useState<Servicio | null>(null);

  const { control, handleSubmit, setValue, watch } = useForm<AppointmentForm>({
    defaultValues: {
      date: new Date(),
      time: format(new Date(), 'HH:mm'),
      clientId: '',
      serviceId: '',
      notes: '',
    },
  });

  const selectedDate = watch('date');
  const selectedTime = watch('time');

  useEffect(() => {
    if (route.params?.appointmentId) {
      // Cargar datos de la cita si estamos editando
      loadAppointmentData();
    }
  }, [route.params?.appointmentId]);

  const loadAppointmentData = async () => {
    setLoading(true);
    try {
      // Aquí cargaríamos los datos de la cita desde la API
      // const appointment = await getAppointmentById(route.params.appointmentId);
      // setValue('clientId', appointment.clientId);
      // etc...
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la información de la cita');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: AppointmentForm) => {
    if (!selectedClient || !selectedService) {
      Alert.alert('Error', 'Por favor selecciona un cliente y un servicio');
      return;
    }

    setLoading(true);
    try {
      // Aquí iría la lógica para crear/actualizar la cita
      // const response = await createAppointment(data);
      // dispatch(addAppointment(response.data));
      Alert.alert(
        'Éxito',
        'Cita creada correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la cita');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setValue('date', selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setValue('time', format(selectedTime, 'HH:mm'));
    }
  };

  // Datos de ejemplo
  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', 
    '11:30', '12:00', '14:00', '14:30', '15:00'
  ];

  const services: Service[] = [
    { id: '1', name: 'Corte de cabello', duration: '45min', price: 25 },
    { id: '2', name: 'Tinte', duration: '120min', price: 80 },
    { id: '3', name: 'Peinado', duration: '30min', price: 20 },
    { id: '4', name: 'Manicure', duration: '45min', price: 15 },
  ];

  const getTotalDuration = () => {
    const totalMinutes = services.reduce((total, service) => {
      return total + parseInt(service.duration.split('min')[0]);
    }, 0);
    return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}min`;
  };

  const getTotalPrice = () => {
    return services.reduce((total, service) => {
      return total + service.price;
    }, 0);
  };

  const handleSelectClient = () => {
    navigation.navigate('ClientDetail', { clientId: '' });
  };

  const handleSelectService = () => {
    // Navegar a la selección de servicios
  };

  const renderTimeSlots = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.timeSlotsContainer}
    >
      {availableTimes.map((time) => (
        <TouchableOpacity
          key={time}
          style={[
            styles.timeSlot,
            selectedTime === time && styles.selectedTimeSlot
          ]}
          onPress={() => setValue('time', time)}
        >
          <Text style={[
            styles.timeSlotText,
            selectedTime === time && styles.selectedTimeSlotText
          ]}>
            {time}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>
          {route.params?.appointmentId ? 'Editar Cita' : 'Nueva Cita'}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cliente</Text>
          <TouchableOpacity
            style={styles.clientSelector}
            onPress={handleSelectClient}
          >
            {selectedClient ? (
              <View>
                <Text style={styles.clientName}>{selectedClient.nombre}</Text>
                <Text style={styles.clientSubtext}>{selectedClient.telefono}</Text>
              </View>
            ) : (
              <Text style={styles.placeholderText}>Seleccionar Cliente</Text>
            )}
            <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Servicio</Text>
          <TouchableOpacity
            style={styles.serviceSelector}
            onPress={handleSelectService}
          >
            {selectedService ? (
              <View>
                <Text style={styles.serviceName}>{selectedService.nombre}</Text>
                <Text style={styles.serviceSubtext}>${selectedService.precio} - {selectedService.duracion}</Text>
              </View>
            ) : (
              <Text style={styles.placeholderText}>Seleccionar Servicio</Text>
            )}
            <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fecha y Hora</Text>
          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.selectedDate}>
              {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
            </Text>
          </TouchableOpacity>

          <View style={styles.timeSection}>
            <Text style={styles.subSectionTitle}>Horarios Disponibles</Text>
            {renderTimeSlots()}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Servicios</Text>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceItem,
                watch('serviceId') === service.id && styles.selectedServiceItem
              ]}
              onPress={() => setValue('serviceId', service.id)}
            >
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDuration}>{service.duration}</Text>
              </View>
              <View style={styles.servicePrice}>
                <Text style={styles.priceText}>${service.price}</Text>
                {watch('serviceId') === service.id && (
                  <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notas</Text>
          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.notesInput}
                placeholder="Agregar notas o comentarios..."
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
              />
            )}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Duración</Text>
            <Text style={styles.summaryValue}>{getTotalDuration()}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>${getTotalPrice()}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.submitButton, (!selectedClient || !selectedService) && styles.buttonDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={loading || !selectedClient || !selectedService}
        >
          <Text style={styles.submitButtonText}>
            {route.params?.appointmentId ? 'Actualizar Cita' : 'Crear Cita'}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={new Date(`2000-01-01T${selectedTime}`)}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
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
  section: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  clientSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  clientName: {
    fontSize: 16,
    color: COLORS.text,
  },
  clientSubtext: {
    fontSize: 14,
    color: COLORS.gray,
  },
  placeholderText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  dateSelector: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedDate: {
    fontSize: 16,
    color: COLORS.text,
    textTransform: 'capitalize',
  },
  timeSelector: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedTime: {
    fontSize: 16,
    color: COLORS.text,
  },
  serviceSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  serviceSubtext: {
    fontSize: 14,
    color: COLORS.gray,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedServiceItem: {
    backgroundColor: COLORS.primary + '10',
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceDuration: {
    fontSize: 14,
    color: COLORS.gray,
  },
  servicePrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  notesInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
  },
  timeSection: {
    marginTop: 16,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 12,
  },
  timeSlotsContainer: {
    flexGrow: 0,
    marginBottom: 16,
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedTimeSlot: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeSlotText: {
    fontSize: 16,
    color: COLORS.text,
  },
  selectedTimeSlotText: {
    color: COLORS.white,
  },
});

export default NewAppointmentScreen; 