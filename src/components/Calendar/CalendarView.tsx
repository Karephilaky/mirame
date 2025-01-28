import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { COLORS } from '../../styles/common';
import { LocaleConfig } from 'react-native-calendars';

// Configuración del calendario en español
LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
};

LocaleConfig.defaultLocale = 'es';

interface CalendarViewProps {
  onDayPress: (date: any) => void;
  markedDates?: any;
  minDate?: string;
  maxDate?: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  onDayPress,
  markedDates,
  minDate,
  maxDate
}) => {
  return (
    <View style={styles.container}>
      <RNCalendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        minDate={minDate}
        maxDate={maxDate}
        theme={{
          backgroundColor: COLORS.background,
          calendarBackground: COLORS.background,
          textSectionTitleColor: COLORS.text,
          selectedDayBackgroundColor: COLORS.primary,
          selectedDayTextColor: COLORS.white,
          todayTextColor: COLORS.primary,
          dayTextColor: COLORS.text,
          textDisabledColor: COLORS.disabled,
          arrowColor: COLORS.primary,
          monthTextColor: COLORS.text,
          textDayFontWeight: '400',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
  },
}); 