import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { COLORS } from '../../styles/common';
import { Employee, Service } from '../../types/api.types';
import { appointmentsService } from '../../services/api/appointments.service';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

type SelectEmployeeScreenRouteProp = RouteProp<RootStackParamList, 'SelectEmployee'>;

interface Props {
  route: SelectEmployeeScreenRouteProp;
  navigation: any; // Puedes tiparlo más específicamente si lo necesitas
}

const SelectEmployeeScreen: React.FC<Props> = ({ route, navigation }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const { service } = route.params;

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await appointmentsService.getEmployeesForService(service.id);
      setEmployees(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los empleados disponibles');
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeSelect = (employee: Employee) => {
    const serviceWithDates = {
      ...service,
      price: Number(service.price),
      created_at: service.created_at,
      updated_at: service.updated_at
    };

    navigation.navigate('SelectDateTime', {
      service: serviceWithDates,
      employee
    });
  };

  if (loading) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un Profesional</Text>
      <Text style={styles.subtitle}>
        Para el servicio: {service.name}
      </Text>
      
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.employeeCard}
            onPress={() => handleEmployeeSelect(item)}
          >
            <View style={styles.employeeInfo}>
              <View style={styles.avatarContainer}>
                {item.avatar ? (
                  <Image 
                    source={{ uri: item.avatar }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                      {item.name.charAt(0)}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.employeeDetails}>
                <Text style={styles.employeeName}>{item.name}</Text>
                <Text style={styles.employeeSpecialties}>
                  {item.specialties.join(' • ')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    padding: 20,
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listContent: {
    padding: 16,
  },
  employeeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  employeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  employeeDetails: {
    flex: 1,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  employeeSpecialties: {
    fontSize: 14,
    color: COLORS.gray,
  },
});

export default SelectEmployeeScreen; 