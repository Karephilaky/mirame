import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const ForgotPasswordScreen = () => {
  return (
    <View>
      <Text>Forgot Password</Text>
      <TextInput placeholder="Enter your email" />
      <Button title="Reset Password" onPress={() => {}} />
    </View>
  );
};

export default ForgotPasswordScreen;