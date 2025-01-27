import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { COLORS } from '../styles/common';
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setUser } from '../store/slices/authSlice';
import { UserRole } from '../types/database';

type Route = {
  name: string;
  title: string;
  params?: object;
};

type Routes = {
  [key: string]: Route[];
};

const mockUser = {
  id: '1',
  nombre: 'Usuario de Prueba',
  email: 'test@test.com',
  telefono: '1234567890',
  id_rol: '3' as UserRole, // Iniciamos como cliente
  creado_en: new Date(),
  actualizado_en: new Date(),
};

const DevMenu: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  // Inicializamos el usuario de prueba si no existe
  useEffect(() => {
    if (!user) {
      console.log('Inicializando usuario de prueba');
      dispatch(setUser(mockUser));
    }
  }, []);

  const roles = [
    { id: '1', title: 'Administrador' },
    { id: '2', title: 'Empleado' },
    { id: '3', title: 'Cliente' },
  ];

  const changeRole = (roleId: UserRole) => {
    const updatedUser = user ? {
      ...user,
      id_rol: roleId
    } : {
      ...mockUser,
      id_rol: roleId
    };
    
    console.log('Cambiando rol a:', roleId);
    dispatch(setUser(updatedUser));
    
    // Forzamos la recarga de la navegación
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Main',
          params: { screen: 'Home' }
        },
      ],
    });
    setVisible(false);
  };

  useEffect(() => {
    console.log('Usuario actual:', user);
  }, [user]);

  const routes: Routes = {
    Roles: [
      { name: 'ChangeRole', title: 'Cambiar Rol' },
    ],
    Auth: [
      { name: 'Login', title: 'Inicio de Sesión' },
      { name: 'Register', title: 'Registro' },
      { name: 'ForgotPassword', title: 'Recuperar Contraseña' },
    ],
    Main: [
      { name: 'Home', title: 'Inicio' },
      { name: 'Profile', title: 'Perfil' },
      { name: 'Settings', title: 'Configuración' },
    ],
    Appointments: [
      { name: 'CalendarMain', title: 'Calendario' },
      { name: 'DayAppointments', title: 'Citas del Día', params: { date: new Date().toISOString() } },
      { name: 'NewAppointment', title: 'Nueva Cita' },
      { name: 'AppointmentDetail', title: 'Detalle de Cita', params: { appointmentId: '1' } },
    ],
    Clients: [
      { name: 'ClientList', title: 'Lista de Clientes' },
      { name: 'ClientDetail', title: 'Detalle de Cliente', params: { clientId: '1' } },
      { name: 'NewAppointment', title: 'Nueva Cita para Cliente', params: { clientId: '1' } },
    ],
    Services: [
      { name: 'ServiceList', title: 'Lista de Servicios' },
      { name: 'ServiceForm', title: 'Nuevo Servicio' },
      { name: 'ServiceForm', title: 'Editar Servicio', params: { serviceId: '1' } },
    ],
    Profile: [
      { name: 'ProfileMain', title: 'Mi Perfil' },
      { name: 'EditProfile', title: 'Editar Perfil' },
      { name: 'ChangePassword', title: 'Cambiar Contraseña' },
      { name: 'BusinessInfo', title: 'Información del Negocio' },
      { name: 'PaymentMethods', title: 'Métodos de Pago' },
      { name: 'Support', title: 'Soporte' },
    ],
  };

  const navigateToScreen = (stack: string, screen: string, params?: object) => {
    if (stack === 'Auth') {
      navigation.navigate('Auth' as any, { screen, params });
    } else {
      navigation.navigate('Main' as any, {
        screen: stack,
        params: {
          screen,
          params,
        },
      });
    }
    setVisible(false);
  };

  const renderSection = (title: string, routes: Route[]) => (
    <View style={styles.section} key={title}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {routes.map((route, index) => (
        <TouchableOpacity
          key={`${route.name}-${index}`}
          style={styles.routeButton}
          onPress={() => navigateToScreen(title, route.name, route.params)}
        >
          <Text style={styles.routeText}>{route.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => {
          // Si no hay usuario, creamos uno antes de mostrar el menú
          if (!user) {
            dispatch(setUser(mockUser));
          }
          setVisible(true);
        }}
      >
        <Text style={styles.triggerText}>DEV</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Dev Menu</Text>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Rol Actual: {roles.find(r => r.id === user?.id_rol)?.title || 'No definido'}
                </Text>
                <Text style={styles.debugText}>ID Rol: {user?.id_rol}</Text>
                <View style={styles.roleButtons}>
                  {roles.map(role => (
                    <TouchableOpacity
                      key={role.id}
                      style={[
                        styles.roleButton,
                        user?.id_rol === role.id && styles.roleButtonActive
                      ]}
                      onPress={() => changeRole(role.id as UserRole)}
                    >
                      <Text style={[
                        styles.roleButtonText,
                        user?.id_rol === role.id && styles.roleButtonTextActive
                      ]}>
                        {role.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {Object.entries(routes).map(([key, value]) => 
                renderSection(key, value)
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: COLORS.primary + '80',
    padding: 8,
    borderRadius: 8,
    zIndex: 1000,
  },
  triggerText: {
    color: COLORS.white,
    fontWeight: 'bold',
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
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: COLORS.gray,
  },
  scrollView: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  routeButton: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  routeText: {
    color: COLORS.text,
  },
  roleButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  roleButton: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 8,
    minWidth: '30%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  roleButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  roleButtonTextActive: {
    color: COLORS.white,
  },
  debugText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
});

export default DevMenu; 