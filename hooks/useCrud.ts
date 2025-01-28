import { useState, useEffect } from 'react';
import api from '../services/api'; // Asegúrate de que este sea el path correcto

type ApiResponse<T> = {
  data: T;
};

export const useCrud = <T,>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener datos
  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: ApiResponse<T[]> = await api.get(endpoint);
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al obtener los datos');
    } finally {
      setLoading(false);
    }
  };

  // Crear un nuevo registro
  const createData = async (newData: T): Promise<T | void> => {
    setLoading(true);
    try {
      const response: ApiResponse<T> = await api.post(endpoint, newData);
      setData((prevData) => [...prevData, response.data]);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear el dato');
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un registro
  const updateData = async (id: string | number, updatedData: Partial<T>): Promise<T | void> => {
    setLoading(true);
    try {
      const response: ApiResponse<T> = await api.put(`${endpoint}/${id}`, updatedData);
      setData((prevData) => prevData.map((item) => (item.id === id ? response.data : item)));
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar el dato');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un registro
  const deleteData = async (id: string | number): Promise<void> => {
    setLoading(true);
    try {
      await api.delete(`${endpoint}/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar el dato');
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar los datos al montar el hook
  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, fetchData, createData, updateData, deleteData };
};
