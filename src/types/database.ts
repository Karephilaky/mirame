// Tipos base de datos
export const ROLES = {
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  CLIENT: 'client'
} as const;

export type UserRole = 'admin' | 'employee' | 'client'; // Ajustado para coincidir con AuthResponse

export interface User {
  id: number;
  name: string;
  email: string;
  telefono?: string;
  id_rol: string;
  role: UserRole;
  imagen?: string;
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
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  especialidad: string;
  activo: boolean;
  creado_en: Date;
  actualizado_en: Date;
}

export interface Cita {
  id: number;
  id_cliente: number;
  id_empleado: number;
  id_servicio: number;
  fecha: Date;
  hora: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada';
  turno_asignado: boolean;
  creado_en: Date;
  deleted_at: Date | null;
}

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
  imagen?: string;
  categoria: string;
  activo: boolean;
  puntos_otorgados: number;
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
  user: {
    id: number;
    name: string;
    email: string;
    role: UserRole;
  };
  token: string;
}

export type AppointmentStatus = 'pendiente' | 'confirmada' | 'cancelada' | 'completada';

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  date: Date;
  time: string;
  status: AppointmentStatus;
  service: Servicio;
  createdAt: Date;
  updatedAt: Date;
  fecha: Date;
  hora: string;
  estado: AppointmentStatus;
}

export interface UserStats {
  totalAppointments: number;
  loyaltyPoints: number;
  completedServices: number;
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