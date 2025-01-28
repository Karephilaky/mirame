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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/types';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../../store/slices/authSlice';
import authApi from '../../services/api/auth.service';
import { UserRole } from '../../types/database';
import { ROLES } from '../../types/database';
import { getHomeScreenByRole, getRoleMessage } from '../../utils/roleNavigation';
import { AuthNavigationProp } from '../../navigation/types';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
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
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        telefono: response.user.telefono || '',
        id_rol: userRole,
        creado_en: new Date(),
        actualizado_en: new Date()
      }));

      if (response.token) {
        dispatch(setToken(response.token));
        
        // Después de un login exitoso, navegar según el rol
        if (response.user.role === 'client') {
          navigation.replace('ClientTabs' as any);
        } else if (response.user.role === 'employee') {
          navigation.replace('EmployeeTabs' as any);
        } else if (response.user.role === 'admin') {
          navigation.replace('AdminTabs' as any);
        }
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

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword' as keyof AuthStackParamList);
  };

  const handleRegister = () => {
    navigation.navigate('Register' as keyof AuthStackParamList);
  };

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
            onPress={handleForgotPassword}
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
            onPress={handleRegister}
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
    padding: 24,
    paddingTop: 60,
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
    backgroundColor: COLORS.background,
    borderRadius: 60,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    padding: 4,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.gray,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  registerButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default LoginScreen;