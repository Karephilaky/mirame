import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, commonStyles } from '../../styles/common';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../../store/slices/authSlice';
import authApi from '../../api/auth';
import { User, UserRole, ROLES } from '../../types/database';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    telefono: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);
      
      const registerData = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        phone: formData.telefono.trim() || undefined,
        role: 'client'
      };

      await authApi.register(registerData);
      const loginResponse = await authApi.login(registerData.email, registerData.password);

      const userRole = ROLES.CLIENT; // Siempre será cliente en el registro

      dispatch(setUser({
        id: String(loginResponse.user.id),
        nombre: loginResponse.user.name,
        email: loginResponse.user.email,
        telefono: '',
        id_rol: userRole,
        creado_en: new Date(),
        actualizado_en: new Date()
      }));

      if (loginResponse.token) {
        dispatch(setToken(loginResponse.token));
        
        Alert.alert(
          '¡Registro Exitoso!',
          'Bienvenido a Mírame. Tu cuenta ha sido creada correctamente.',
          [
            { 
              text: 'Continuar',
              onPress: () => navigation.navigate('ClientHome' as never)
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error 
          ? error.message 
          : 'Error al registrar usuario. Por favor, intenta de nuevo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.input}
            placeholder="Teléfono (opcional)"
            value={formData.telefono}
            onChangeText={(text) => setFormData({...formData, telefono: text})}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color={COLORS.gray}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
            secureTextEntry={!showPassword}
          />
        </View>

        <TouchableOpacity 
          style={[styles.registerButton, loading && styles.disabledButton]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.registerButtonText}>Registrarse</Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    marginLeft: 10,
    color: COLORS.text,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: COLORS.text,
  },
  loginLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;