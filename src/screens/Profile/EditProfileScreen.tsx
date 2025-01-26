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
    <View style={styles.container}>
      <Text>Editar Perfil</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});

export default EditProfileScreen; 