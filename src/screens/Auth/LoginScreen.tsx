import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/common';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '../../navigation/types';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../../store/slices/authSlice';
import authApi from '../../api/auth';
import { UserRole } from '../../types/database';
import { ROLES } from '../../types/database';
import { getHomeScreenByRole, getRoleMessage } from '../../utils/roleNavigation';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      setIsLoading(true);
      const response = await authApi.login(formData.email, formData.password);

      const userRole = response.user.role === 'client' ? ROLES.CLIENT : 
                      response.user.role === 'admin' ? ROLES.ADMIN : 
                      ROLES.EMPLOYEE;

      dispatch(setUser({
        id: String(response.user.id),
        nombre: response.user.name,
        email: response.user.email,
        telefono: '',
        id_rol: userRole,
        creado_en: new Date(),
        actualizado_en: new Date()
      }));

      if (response.token) {
        dispatch(setToken(response.token));
        
        // Mostrar mensaje de bienvenida según el rol
        Alert.alert(
          'Inicio de Sesión Exitoso',
          getRoleMessage(userRole),
          [
            { 
              text: 'Continuar',
              onPress: () => navigation.navigate(getHomeScreenByRole(userRole) as never)
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error 
          ? error.message 
          : 'Error al iniciar sesión. Por favor, intenta de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      const response = await fetch('http://192.168.100.129:3000/api');
      console.log('Conexión exitosa:', response.status);
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Ionicons name="cut" size={80} color={COLORS.primary} />
          </View>
          <Text style={styles.appName}>Mírame</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            mode="outlined"
            label="Correo electrónico"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            disabled={isLoading}
          />

          <TextInput
            mode="outlined"
            label="Contraseña"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon 
                icon={showPassword ? 'eye-off' : 'eye'} 
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={styles.input}
            disabled={isLoading}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
            disabled={isLoading}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? <ActivityIndicator color={COLORS.white} /> : 'Iniciar sesión'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>O</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoIcon: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: COLORS.primary,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.gray,
    paddingHorizontal: 16,
  },
  registerButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  registerButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginScreen;