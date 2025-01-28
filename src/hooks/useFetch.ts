import { useState, useEffect } from 'react';
import apiClient from '../services/api/api/apiClient';

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T,>(endpoint: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get<T>(endpoint);
        setData(response.data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};