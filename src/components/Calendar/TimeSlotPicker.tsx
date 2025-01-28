import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { COLORS } from '../../constants/colors';

interface TimeSlot {
  time: string;
  available: boolean;
  employeeId?: number;
}

interface TimeSlotPickerProps {
  timeSlots: TimeSlot[];
  selectedTime?: string;
  onSelectTime: (time: string) => void;
  workingHours?: {
    start: string;
    end: string;
  };
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  timeSlots,
  selectedTime,
  onSelectTime,
  workingHours = { start: '09:00', end: '18:00' },
}) => {
  const screenWidth = Dimensions.get('window').width;
  const slotWidth = (screenWidth - 48) / 3; // 3 slots por fila con padding

  const isTimeSlotAvailable = (time: string) => {
    const slot = timeSlots.find(slot => slot.time === time);
    return slot?.available ?? false;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const generateTimeSlots = () => {
    const slots: string[] = [];
    const [startHour] = workingHours.start.split(':').map(Number);
    const [endHour] = workingHours.end.split(':').map(Number);
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    
    return slots;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.slotsContainer}>
        {generateTimeSlots().map((time) => {
          const isAvailable = isTimeSlotAvailable(time);
          const isSelected = selectedTime === time;

          return (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeSlot,
                { width: slotWidth },
                isAvailable ? styles.availableSlot : styles.unavailableSlot,
                isSelected && styles.selectedSlot,
              ]}
              onPress={() => isAvailable && onSelectTime(time)}
              disabled={!isAvailable}
            >
              <Text
                style={[
                  styles.timeText,
                  !isAvailable && styles.unavailableText,
                  isSelected && styles.selectedText,
                ]}
              >
                {formatTime(time)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 8,
  },
  timeSlot: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  availableSlot: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  unavailableSlot: {
    backgroundColor: COLORS.gray[100],
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  selectedSlot: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  unavailableText: {
    color: COLORS.gray[400],
  },
  selectedText: {
    color: COLORS.white,
  },
});

export default TimeSlotPicker;
