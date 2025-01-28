import { 
  User, 
  Servicio, 
  Cliente, 
  Empleado, 
  Tienda, 
  Producto, 
  Reserva,
  Appointment 
} from './database';

export interface AuthService {
  login: (credentials: { email: string; password: string }) => Promise<{ token: string; user: User }>;
  register: (userData: Partial<User>) => Promise<{ token: string; user: User }>;
  logout: () => Promise<void>;
}

export interface UsersService {
  getUsers: () => Promise<User[]>;
  getUserById: (id: string) => Promise<User>;
  updateUser: (id: string, data: Partial<User>) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
}

export interface ServicesService {
  getServices: () => Promise<Servicio[]>;
  getServiceById: (id: string) => Promise<Servicio>;
  createService: (data: Partial<Servicio>) => Promise<Servicio>;
  updateService: (id: string, data: Partial<Servicio>) => Promise<Servicio>;
  deleteService: (id: string) => Promise<void>;
}

export interface AppointmentsService {
  getAppointments: () => Promise<Appointment[]>;
  getAppointmentById: (id: string) => Promise<Appointment>;
  createAppointment: (data: Partial<Appointment>) => Promise<Appointment>;
  updateAppointment: (id: string, data: Partial<Appointment>) => Promise<Appointment>;
  deleteAppointment: (id: string) => Promise<void>;
}

export interface EmployeesService {
  getEmployees: () => Promise<Empleado[]>;
  getEmployeeById: (id: string) => Promise<Empleado>;
  updateEmployee: (id: string, data: Partial<Empleado>) => Promise<Empleado>;
  deleteEmployee: (id: string) => Promise<void>;
  restoreEmployee: (id: string) => Promise<void>;
}

export interface ClientsService {
  getClients: () => Promise<Cliente[]>;
  getClientById: (id: string) => Promise<Cliente>;
  createClient: (data: Partial<Cliente>) => Promise<Cliente>;
  updateClient: (id: string, data: Partial<Cliente>) => Promise<Cliente>;
  deleteClient: (id: string) => Promise<void>;
}

export interface StoresService {
  getStores: () => Promise<Tienda[]>;
  getStoreById: (id: string) => Promise<Tienda>;
  createStore: (data: Partial<Tienda>) => Promise<Tienda>;
  updateStore: (id: string, data: Partial<Tienda>) => Promise<Tienda>;
  deleteStore: (id: string) => Promise<void>;
}

export interface ProductsService {
  getProducts: () => Promise<Producto[]>;
  getProductById: (id: string) => Promise<Producto>;
  createProduct: (data: Partial<Producto>) => Promise<Producto>;
  updateProduct: (id: string, data: Partial<Producto>) => Promise<Producto>;
  deleteProduct: (id: string) => Promise<void>;
}

export interface ReservationsService {
  getReservations: () => Promise<Reserva[]>;
  getReservationById: (id: string) => Promise<Reserva>;
  createReservation: (data: Partial<Reserva>) => Promise<Reserva>;
  updateReservation: (id: string, data: Partial<Reserva>) => Promise<Reserva>;
  deleteReservation: (id: string) => Promise<void>;
}

// ... definir interfaces para los demás servicios ... 