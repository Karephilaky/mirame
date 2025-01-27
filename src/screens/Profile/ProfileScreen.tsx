import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, commonStyles } from '../../styles/common';
import { NavigationProp, useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { ProfileStackParamList, RootStackParamList } from '../../navigation/types';
import { CompositeProfileScreenNavigationProp } from '../../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store/types';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'employee';
  avatar?: string;
  notifications: {
    appointments: boolean;
    reminders: boolean;
    marketing: boolean;
  };
}

// Definir el tipo de navegación compuesto
type ProfileScreenNavigationProp = CompositeNavigationProp<
  NavigationProp<ProfileStackParamList>,
  NavigationProp<RootStackParamList>
>;

const ProfileScreen = () => {
  const navigation = useNavigation<CompositeProfileScreenNavigationProp>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [profile] = useState<UserProfile>({
    id: '1',
    name: 'Ana María López',
    email: 'ana.lopez@example.com',
    phone: '+593 98 765 4321',
    role: 'admin',
    notifications: {
      appointments: true,
      reminders: true,
      marketing: false,
    }
  });

  const [notifications, setNotifications] = useState(profile.notifications);

  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Información Personal',
      onPress: () => navigation.navigate('EditProfile')
    },
    {
      icon: 'lock-closed-outline',
      title: 'Cambiar Contraseña',
      onPress: () => navigation.navigate('ChangePassword')
    },
    {
      icon: 'business-outline',
      title: 'Información del Negocio',
      onPress: () => navigation.navigate('BusinessInfo')
    },
    {
      icon: 'card-outline',
      title: 'Métodos de Pago',
      onPress: () => navigation.navigate('PaymentMethods')
    },
    {
      icon: 'help-circle-outline',
      title: 'Ayuda y Soporte',
      onPress: () => navigation.navigate('Support')
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sí, cerrar sesión',
          style: 'destructive',
          onPress: () => dispatch(logout())
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Ionicons name="create-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {profile.avatar ? (
              <Image 
                source={{ uri: profile.avatar }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user?.nombre}</Text>
          <Text style={styles.role}>
            {profile.role === 'admin' ? 'Administrador' : 'Empleado'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Contacto</Text>
          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={20} color={COLORS.gray} />
            <Text style={styles.infoText}>{profile.email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color={COLORS.gray} />
            <Text style={styles.infoText}>{profile.phone}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>Citas</Text>
            <Switch
              value={notifications.appointments}
              onValueChange={(value) => 
                setNotifications({ ...notifications, appointments: value })
              }
              trackColor={{ false: COLORS.gray, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>Recordatorios</Text>
            <Switch
              value={notifications.reminders}
              onValueChange={(value) => 
                setNotifications({ ...notifications, reminders: value })
              }
              trackColor={{ false: COLORS.gray, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>Marketing</Text>
            <Switch
              value={notifications.marketing}
              onValueChange={(value) => 
                setNotifications({ ...notifications, marketing: value })
              }
              trackColor={{ false: COLORS.gray, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menú</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon as any} size={20} color={COLORS.gray} />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: COLORS.gray,
  },
  section: {
    backgroundColor: COLORS.white,
    padding: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  notificationText: {
    fontSize: 16,
    color: COLORS.text,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.error,
    marginLeft: 8,
    fontWeight: '600',
  },
});

export default ProfileScreen; 