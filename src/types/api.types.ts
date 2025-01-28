import { User, Servicio, Cliente, Empleado, Tienda, Producto, Reserva } from './database';

export interface AuthService {
  login: (email: string, password: string) => Promise<{ user: User; token: string }>;
  register: (data: RegisterDto) => Promise<{ user: User; token: string }>;
  logout: () => Promise<void>;
  verifyToken: (token: string) => Promise<boolean>;
}

export interface UsersService {
  getProfile: () => Promise<User>;
  updateProfile: (data: Partial<User>) => Promise<User>;
  changePassword: (data: ChangePasswordDto) => Promise<void>;
}

export interface ServicesService {
  getAll: () => Promise<Servicio[]>;
  getById: (id: string) => Promise<Servicio>;
  create: (data: CreateServiceDto) => Promise<Servicio>;
  update: (id: string, data: UpdateServiceDto) => Promise<Servicio>;
  delete: (id: string) => Promise<void>;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number; // en minutos
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: number;
  date: string;  // en lugar de fecha
  status: string; // en lugar de estado
  client_id: number;
  employee_id: number;
  service_id: number;
  time: string;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  avatar?: string;
  schedule: {
    start_time: string;
    end_time: string;
    days: number[]; // 0-6 (domingo-sábado)
  };
}

export interface TimeSlot {
  time: string;
  available: boolean;
  available_employees: Employee[];
}

export interface CreateServiceDto {
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
  categoria: string;
  imagen?: string;
}

export interface UpdateServiceDto extends Partial<CreateServiceDto> {} 