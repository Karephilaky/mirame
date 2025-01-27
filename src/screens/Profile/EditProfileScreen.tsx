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
import { COLORS } from '../../styles/common';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../navigation/types';

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
  
  const [formData, setFormData] = useState<ProfileFormData>({
    id: '1', // Este ID vendría del usuario autenticado
    nombre: 'Ana María López',
    email: 'ana.lopez@example.com',
    telefono: '+593 98 765 4321',
    id_rol: '1', // ID del rol correspondiente
  });

  const handleSave = async () => {
    try {
      // Aquí iría la lógica para actualizar el usuario en la base de datos
      // Ejemplo de estructura SQL:
      // UPDATE users 
      // SET nombre = ?, email = ?, telefono = ?, actualizado_en = CURRENT_TIMESTAMP
      // WHERE id = ?
      
      Alert.alert(
        'Éxito',
        'Los cambios han sido guardados',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudieron guardar los cambios');
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
          onPress={handleSave}
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
            {formData.imagen ? (
              <Image 
                source={{ uri: formData.imagen }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>
                  {formData.nombre.split(' ').map(n => n[0]).join('')}
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
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              value={formData.nombre}
              onChangeText={(text) => setFormData({ ...formData, nombre: text })}
              placeholder="Ingresa tu nombre"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Ingresa tu correo"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              value={formData.telefono}
              onChangeText={(text) => setFormData({ ...formData, telefono: text })}
              placeholder="Ingresa tu teléfono"
              keyboardType="phone-pad"
            />
          </View>
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