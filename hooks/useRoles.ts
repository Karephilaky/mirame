import { useState, useEffect } from "react";
import api from "../services/api";

type Role = {
  id: number;
  nombre: string;
  descripcion: string;
  creadoEn: string;
  deletedAt: string | null;
};

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    try {
      const response = await api.get<Role[]>('/roles'); // Llama al endpoint
      setRoles(response.data); // Almacena los roles en el estado
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al obtener roles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return { roles, loading, error };
};
