import { useAppSelector, useAppDispatch } from './useRedux';
import { setLoading, setError, clearError } from '../store/slices/loadingSlice';

export const useLoading = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.loading);

  const startLoading = () => dispatch(setLoading(true));
  const stopLoading = () => dispatch(setLoading(false));
  const setErrorMessage = (message: string) => dispatch(setError(message));
  const clearErrorMessage = () => dispatch(clearError());

  const withLoading = async <T>(
    callback: () => Promise<T>,
    errorMessage = 'Ha ocurrido un error'
  ): Promise<T | undefined> => {
    try {
      startLoading();
      const result = await callback();
      return result;
    } catch (error) {
      console.error(error);
      setErrorMessage(errorMessage);
      return undefined;
    } finally {
      stopLoading();
    }
  };

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorMessage,
    clearErrorMessage,
    withLoading,
  };
}; 