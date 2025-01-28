import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../navigation/types';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { updateProfile } from '../../store/slices/profileSlice';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { UpdateUserDto } from '../../services/api/users.service';
import { COLORS } from '../../styles/common';

interface ProfileFormData {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  imagen?: string;
  password?: string; // No lo mostraremos en el formulario, pero está en la DB
  id_rol?: string;   // Referencia a la tabla roles
  actualizado_en?: Date;
}

type EditProfileScreenNavigationProp = NavigationProp<ProfileStackParamList>;

const EditProfileScreen = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { loading = false } = useAppSelector((state) => state.profile) || {};

  const { control, handleSubmit, formState: { errors } } = useForm<UpdateUserDto>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      telefono: user?.telefono || '',
    }
  });

  const avatarText = user?.name?.split(' ').map((n: string) => n[0]).join('');

  const onSubmit = async (data: UpdateUserDto) => {
    if (!user?.id) {
      Alert.alert('Error', 'No se pudo identificar al usuario');
      return;
    }

    try {
      await dispatch(updateProfile({ 
        userId: user.id, 
        data 
      })).unwrap();
      
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Error', 
        typeof error === 'string' ? error : 'Error al actualizar el perfil'
      );
    }
  };

  const handleChangeImage = async () => {
    try {
      // Aquí iría la lógica para subir la imagen y actualizar el campo imagen en la DB
      // UPDATE users SET imagen = ?, actualizado_en = CURRENT_TIMESTAMP WHERE id = ?
      Alert.alert('Cambiar imagen', 'Esta función estará disponible próximamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la imagen');
    }
  };

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
        <Text style={styles.headerTitle}>Editar Perfil</Text>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageSection}>
          <View style={styles.avatarContainer}>
            {user?.imagen ? (
              <Image 
                source={{ uri: user.imagen }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>
                  {avatarText}
                </Text>
              </View>
            )}
            <TouchableOpacity 
              style={styles.changeImageButton}
              onPress={handleChangeImage}
            >
              <Ionicons name="camera" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.changeImageText}>Cambiar foto de perfil</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            rules={{ required: 'El nombre es requerido' }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nombre"
                value={value}
                onChangeText={onChange}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{ 
              required: 'El email es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="telefono"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Teléfono"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                error={errors.telefono?.message}
              />
            )}
          />

          <Button
            title="Guardar cambios"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          />
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  imageSection: {
    alignItems: 'center',
    padding: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
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
  changeImageButton: {
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
  changeImageText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
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
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default EditProfileScreen; 