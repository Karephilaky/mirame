import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#6200EE',
  secondary: '#03DAC6',
  background: '#F5F5F5',
  white: '#FFFFFF',
  text: '#000000',
  gray: '#757575',
  border: '#E0E0E0',
  error: '#B00020',
  success: '#4CAF50',
  disabled: '#C7C7CC',
} as const;

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 24,
    textAlign: 'center',
  }
}); 