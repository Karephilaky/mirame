import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useRedux';
import { servicesApi } from '../api';
import { setServices } from '../store/slices/servicesSlice';
import { Servicio } from '../types/database';

export const useServices = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector(state => state.services.services);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await servicesApi.getAll();
      dispatch(setServices(data));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al cargar servicios'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    refetchServices: fetchServices,
  };
}; 