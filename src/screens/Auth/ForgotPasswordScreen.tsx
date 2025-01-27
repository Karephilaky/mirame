import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/common';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useLoading } from '../../hooks/useLoading';
import { authApi } from '../../api';
import { AuthStackParamList } from '../../navigation/types';

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  const { withLoading } = useLoading();
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return;
    }

    const success = await withLoading(
      () => authApi.requestPasswordReset(email),
      'Error al enviar el correo de recuperación'
    );

    if (success) {
      setResetSent(true);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="lock-open-outline" size={100} color={COLORS.primary} />
          </View>

          <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
          
          <Text style={styles.subtitle}>
            {resetSent 
              ? 'Te hemos enviado las instrucciones para restablecer tu contraseña. Por favor revisa tu correo.'
              : 'Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.'}
          </Text>

          {!resetSent && (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  label="Correo electrónico"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  mode="outlined"
                  left={<TextInput.Icon icon="email" />}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: COLORS.primary,
                      background: COLORS.white,
                    },
                  }}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleResetPassword}
              >
                <Text style={styles.buttonText}>Enviar instrucciones</Text>
              </TouchableOpacity>
            </>
          )}

          {resetSent && (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.buttonText}>Volver al inicio de sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resendButton}
                onPress={handleResetPassword}
              >
                <Text style={styles.resendButtonText}>Reenviar correo</Text>
              </TouchableOpacity>
            </>
          )}
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
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    padding: 20,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    backgroundColor: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    padding: 16,
  },
  resendButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ForgotPasswordScreen;