import { StyleSheet } from 'react-native';
import { COLORS } from '../../styles/common';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  error: {
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
}); 