import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/common';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/types';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../store/slices/authSlice';
import { RootStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Card } from '../../components/common/Card';

type ProfileNavigationProp = StackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, cerrar sesión',
          onPress: () => {
            dispatch(logout());
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }]
            });
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color={COLORS.primary} />
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </Card>

      <Card>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={handleEditProfile}
        >
          <Ionicons name="person-outline" size={24} color={COLORS.primary} />
          <Text style={styles.menuItemText}>Editar Perfil</Text>
          <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color={COLORS.danger} />
          <Text style={[styles.menuItemText, { color: COLORS.danger }]}>
            Cerrar Sesión
          </Text>
          <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: COLORS.gray,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    color: COLORS.text,
  },
});

export default ProfileScreen; 