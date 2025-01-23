import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  return (
    <View>
      <Text>Register</Text>
      <TextInput placeholder="Name" />
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" secureTextEntry />
      <Button title="Register" onPress={() => navigation.replace('Home')} />
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </View>
  );
}
