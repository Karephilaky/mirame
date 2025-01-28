import { AuthResponse } from '../types/api.types';
import { User } from '../types/database';

export const transformApiUserToStoreUser = (apiUser: AuthResponse['user']): User => ({
  id: apiUser.id,
  name: apiUser.name,
  email: apiUser.email,
  id_rol: apiUser.id_rol,
  telefono: apiUser.telefono,
  creado_en: apiUser.creado_en,
  actualizado_en: apiUser.actualizado_en
}); 