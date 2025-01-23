import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={() => navigation.replace('Home')} />
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
