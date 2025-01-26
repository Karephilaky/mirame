// Tipos base de datos
export type UserRole = '1' | '2' | '3'; // 1: Admin, 2: Empleado, 3: Cliente

export interface User {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  imagen?: string;
  id_rol: UserRole;
  creado_en: Date;
  actualizado_en: Date;
}

export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  email?: string;
  direccion?: string;
  notas?: string;
  creado_en: Date;
  actualizado_en: Date;
}

export interface Empleado {
  id: string;
  id_user: string;
  id_tienda: string;
  nivel_estudio: string;
  habilitar_agenda: boolean;
  comision_porcentaje: number;
  creado_en: Date;
  deleted_at?: Date;
}

export interface Cita {
  id: string;
  id_cliente: string;
  id_empleado: string;
  id_servicio: string;
  fecha: Date;
  hora: string;
  turno_asignado: boolean;
  creado_en: Date;
  deleted_at?: Date;
}

export interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  precio: number;
  activo: boolean;
  categoria: string;
  creado_en: Date;
  actualizado_en: Date;
}

export interface EmpleadoServicio {
  id_empleado: string;
  id_servicio: string;
}

export interface Tienda {
  id: string;
  id_admin: string;
  nombre: string;
  direccion: string;
  numero_celular: string;
  email: string;
  codigo_unico: string;
  imagen?: string;
  creado_en: Date;
  deleted_at?: Date;
}

export interface Reserva {
  id: string;
  id_cliente: string;
  id_tienda: string;
  id_servicio: string;
  fecha: Date;
  hora: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  creado_en: Date;
  deleted_at?: Date;
}

export interface Rol {
  id: string;
  nombre: string;
  descripcion: string;
  creado_en: Date;
  deleted_at?: Date;
}

export interface Producto {
  id: string;
  id_tienda: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen?: string;
  creado_en: Date;
  deleted_at?: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export type AppointmentStatus = 'pendiente' | 'confirmada' | 'cancelada' | 'completada';

export interface Appointment extends Reserva {
  estado: AppointmentStatus;
  monto: number;
}

export type CategoriaServicio = {
  id: string;
  nombre: string;
  color: string;
};

export const CATEGORIAS_SERVICIOS: CategoriaServicio[] = [
  { id: '1', nombre: 'Corte', color: '#FF6B6B' },
  { id: '2', nombre: 'Peinado', color: '#4ECDC4' },
  { id: '3', nombre: 'Color', color: '#45B7D1' },
  { id: '4', nombre: 'Tratamiento', color: '#96CEB4' },
  { id: '5', nombre: 'Manicure', color: '#D4A5A5' },
  { id: '6', nombre: 'Pedicure', color: '#9FA5D5' },
  { id: '7', nombre: 'Maquillaje', color: '#E9967A' },
  { id: '8', nombre: 'Otros', color: '#95A5A6' },
]; 