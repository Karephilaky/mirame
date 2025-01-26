import { useAppDispatch } from './useRedux';
import { setLoading, setError } from '../store/slices/servicesSlice';

export const useLoadingState = () => {
  const dispatch = useAppDispatch();

  const withLoading = async <T>(
    callback: () => Promise<T>,
    errorMessage: string = 'Ha ocurrido un error'
  ): Promise<T | null> => {
    try {
      dispatch(setLoading(true));
      const result = await callback();
      return result;
    } catch (error) {
      dispatch(setError(errorMessage));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { withLoading };
}; 