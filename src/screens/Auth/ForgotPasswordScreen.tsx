import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../../navigation/types';
import { authApi } from '../../services/api/auth.service';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    try {
      setIsLoading(true);
      await authApi.forgotPassword(email);
      Alert.alert(
        'Correo Enviado',
        'Se ha enviado un enlace de recuperación a tu correo electrónico',
        [
          {
            text: 'OK',
            onPress: handleSuccess
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error 
          ? error.message 
          : 'Error al enviar el correo de recuperación'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = () => {
    navigation.navigate('Auth', {
      screen: 'Login'
    });
  };

  const handleSuccess = () => {
    navigation.navigate('Auth', {
      screen: 'Login'
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleNavigation}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed" size={50} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.subtitle}>
            Ingresa tu correo electrónico y te enviaremos las instrucciones para recuperar tu contraseña
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            mode="outlined"
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            disabled={isLoading}
          />

          <TouchableOpacity
            style={[styles.resetButton, isLoading && styles.resetButtonDisabled]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <Text style={styles.resetButtonText}>
              {isLoading ? 'Enviando...' : 'Enviar instrucciones'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={handleNavigation}
            disabled={isLoading}
          >
            <Text style={styles.loginLinkText}>Volver al inicio de sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray[600],
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 24,
    backgroundColor: COLORS.white,
  },
  resetButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  resetButtonDisabled: {
    opacity: 0.7,
  },
  resetButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    alignItems: 'center',
  },
  loginLinkText: {
    color: COLORS.primary,
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;