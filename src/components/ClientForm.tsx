import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addClient } from '../store/slices/clientSlice';

const ClientForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleAddClient = () => {
    dispatch(addClient({ id: Date.now().toString(), name, email }));
    setName('');
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Add Client" onPress={handleAddClient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A269FF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

export default ClientForm;