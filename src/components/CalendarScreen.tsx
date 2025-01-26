import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addReservation } from '../store/slices/reservationSlice';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, commonStyles } from '../styles/common';
import { useAppSelector } from '../hooks/useRedux';
import { Appointment } from '../types/database';

// Configuración del calendario en español
LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
};
LocaleConfig.defaultLocale = 'es';

interface MarkedDates {
  [date: string]: {
    marked: boolean;
    dotColor: string;
  };
}

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [viewType, setViewType] = useState<'calendar' | 'list' | 'week'>('calendar');
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const { appointments } = useAppSelector((state: RootState) => state.appointments);
  const dispatch = useDispatch();

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    // Aquí podrías abrir un modal para crear una nueva reserva
  };

  useEffect(() => {
    const dates: MarkedDates = {};
    appointments.forEach((appointment: Appointment) => {
      const date = new Date(appointment.fecha).toISOString().split('T')[0];
      dates[date] = {
        marked: true,
        dotColor: 'blue',
      };
    });
    setMarkedDates(dates);
  }, [appointments]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendario</Text>
        <View style={styles.viewTypeContainer}>
          <TouchableOpacity 
            style={[styles.viewTypeButton, viewType === 'calendar' && styles.activeViewType]}
            onPress={() => setViewType('calendar')}
          >
            <Ionicons name="calendar-outline" size={24} color={viewType === 'calendar' ? COLORS.primary : COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.viewTypeButton, viewType === 'list' && styles.activeViewType]}
            onPress={() => setViewType('list')}
          >
            <Ionicons name="list-outline" size={24} color={viewType === 'list' ? COLORS.primary : COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.viewTypeButton, viewType === 'week' && styles.activeViewType]}
            onPress={() => setViewType('week')}
          >
            <Ionicons name="grid-outline" size={24} color={viewType === 'week' ? COLORS.primary : COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>

      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: COLORS.background,
          calendarBackground: COLORS.background,
          textSectionTitleColor: COLORS.text,
          selectedDayBackgroundColor: COLORS.primary,
          selectedDayTextColor: COLORS.white,
          todayTextColor: COLORS.primary,
          dayTextColor: COLORS.text,
          textDisabledColor: COLORS.gray,
          dotColor: COLORS.primary,
          selectedDotColor: COLORS.white,
          arrowColor: COLORS.primary,
          monthTextColor: COLORS.text,
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14
        }}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        enableSwipeMonths={true}
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => {/* Abrir modal de nueva reserva */}}
      >
        <Ionicons name="add" size={30} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  viewTypeContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 4,
  },
  viewTypeButton: {
    padding: 8,
    borderRadius: 8,
  },
  activeViewType: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendar: {
    borderRadius: 12,
    margin: 16,
    elevation: 4,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default CalendarScreen;