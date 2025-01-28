import React from 'react';
import { View, StyleSheet } from 'react-native';
import DevMenu from './DevMenu';

const DevMenuContainer = () => {
  console.log('DevMenuContainer rendering, __DEV__:', __DEV__); // Para debug

  if (!__DEV__) return null;

  return <DevMenu />;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999,
    pointerEvents: 'box-none',
  },
});

export default DevMenuContainer; 