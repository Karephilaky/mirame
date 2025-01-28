export { default as api } from '../../config/axios';
export * from './auth.service';
export * from './users.service';
export * from './appointments.service';
export * from './employees.service';
export * from './products.service';
export * from './reservations.service';
export * from './services.service';
export * from './stores.service';

// También exportar los tipos de servicios
export type { 
  AuthService,
  UsersService,
  ServicesService,
  AppointmentsService,
  EmployeesService,
  ClientsService,
  StoresService,
  ProductsService,
  ReservationsService
} from '../../types/types'; 