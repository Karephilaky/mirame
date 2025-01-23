import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface Empresa {
  id: number;
  name: string;
  description: string;
}

export default function HomeScreen() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const addEmpresa = () => {
    if (name && description) {
      setEmpresas((prev) => [
        ...prev,
        { id: Date.now(), name, description },
      ]);
      setName('');
      setDescription('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Empresa</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la empresa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Agregar Empresa" onPress={addEmpresa} />

      <FlatList
        data={empresas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => alert(item.name)}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  card: { backgroundColor: '#f0f0f0', padding: 15, marginVertical: 5, borderRadius: 5 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
});
