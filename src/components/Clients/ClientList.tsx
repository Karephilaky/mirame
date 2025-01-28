import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Cliente } from '../../types/database';

interface ClientListProps {
  clients: Cliente[];
  onSelectClient?: (client: Cliente) => void;
}

export const ClientList: React.FC<ClientListProps> = ({ clients, onSelectClient }) => {
  return (
    <FlatList
      data={clients}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.nombre}</Text>
        </View>
      )}
    />
  );
};
