import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/common';

interface LoadingScreenProps {
  color?: string;
  size?: 'small' | 'large';
}

export const LoadingScreen = ({ 
  color = COLORS.primary, 
  size = 'large' 
}: LoadingScreenProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
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