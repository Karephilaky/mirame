import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/common';
import { Servicio } from '../../types/database';
import { formatCurrency } from '../../utils/format';

interface ServiceCardProps {
  service: Servicio;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onPress,
  onEdit,
  onDelete,
  showActions = false,
}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={service.imagen ? { uri: service.imagen } : require('../../assets/images/default-service.png')}
          style={styles.image}
        />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{service.nombre}</Text>
          {showActions && (
            <View style={styles.actions}>
              {onEdit && (
                <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
                  <Ionicons name="pencil" size={20} color={COLORS.primary} />
                </TouchableOpacity>
              )}
              {onDelete && (
                <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
                  <Ionicons name="trash" size={20} color={COLORS.error} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {service.descripcion}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.price}>
            {formatCurrency(service.precio)}
          </Text>
          <View style={styles.details}>
            <Ionicons name="time-outline" size={16} color={COLORS.gray} />
            <Text style={styles.duration}>{service.duracion} min</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 4,
  },
}); 