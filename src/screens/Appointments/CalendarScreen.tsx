import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { AppointmentScreenNavigationProp } from '../../navigation/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAppSelector } from '../../hooks/useRedux';
import { Appointment } from '../../types/database';
import { COLORS } from '../../styles/common';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CalendarScreen: React.FC = () => {
  const navigation = useNavigation<AppointmentScreenNavigationProp>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { appointments } = useAppSelector(state => state.appointments);

  const getMarkedDates = useCallback(() => {
    const marked: { [key: string]: any } = {};
    appointments.forEach((appointment: Appointment) => {
      const date = format(new Date(appointment.fecha), 'yyyy-MM-dd');
      if (!marked[date]) {
        marked[date] = {
          marked: true,
          dotColor: COLORS.primary,
        };
      }
    });
    return marked;
  }, [appointments]);

  const getDayAppointments = (date: Date): Appointment[] => {
    return appointments.filter(
      app => format(new Date(app.fecha), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const todayAppointments = getDayAppointments(selectedDate);

  return (
    <View style={styles.container}>
      <View style={styles.titleHeader}>
        <Text style={styles.title}>Calendario de Citas</Text>
        <TouchableOpacity 
          style={styles.refreshButton}
        >
          <Ionicons 
            name="refresh" 
            size={24} 
            color={COLORS.primary} 
          />
        </TouchableOpacity>
      </View>

      <Calendar
        markedDates={getMarkedDates()}
        onDayPress={(day: DateData) => {
          setSelectedDate(new Date(day.dateString));
        }}
        theme={{
          selectedDayBackgroundColor: COLORS.primary,
          todayTextColor: COLORS.primary,
          arrowColor: COLORS.primary,
        }}
      />

      <View style={styles.appointmentsContainer}>
        <View style={styles.appointmentsHeader}>
          <Text style={styles.dateText}>
            {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
          </Text>
          <TouchableOpacity
            style={styles.newButton}
            onPress={() => navigation.navigate('NewAppointment', {})}
          >
            <Text style={styles.newButtonText}>Nueva Cita</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.appointmentsList}>
          {todayAppointments.length > 0 ? (
            todayAppointments.map(appointment => (
              <TouchableOpacity
                key={appointment.id}
                style={styles.appointmentCard}
                onPress={() => 
                  navigation.navigate('AppointmentDetail', { 
                    appointmentId: appointment.id 
                  })
                }
              >
                <View style={styles.timeContainer}>
                  <Text style={styles.time}>{appointment.hora}</Text>
                  <View 
                    style={[
                      styles.status, 
                      { backgroundColor: getStatusColor(appointment.estado) }
                    ]} 
                  />
                </View>
                <View style={styles.appointmentInfo}>
                  <Text style={styles.clientName}>
                    Cliente #{appointment.id_cliente}
                  </Text>
                  <Text style={styles.service}>
                    Servicio #{appointment.id_servicio}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No hay citas programadas para este día
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmada':
      return COLORS.success;
    case 'pendiente':
      return COLORS.primary;
    case 'cancelada':
      return COLORS.error;
    default:
      return COLORS.gray;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  refreshButton: {
    padding: 8,
  },
  appointmentsContainer: {
    flex: 1,
    padding: 16,
  },
  appointmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  newButton: {
    padding: 8,
  },
  newButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  appointmentsList: {
    flex: 1,
  },
  appointmentCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  status: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  appointmentInfo: {
    marginTop: 8,
  },
  clientName: {
    fontSize: 14,
    color: COLORS.text,
  },
  service: {
    fontSize: 14,
    color: COLORS.text,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.text,
    textAlign: 'center',
  },
});

export default CalendarScreen; 