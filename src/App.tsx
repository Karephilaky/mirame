import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setToken, setLoading } from './store/slices/authSlice';
import RootNavigator from './navigation/RootNavigator';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import DevMenuContainer from './components/Development/DevMenuContainer';

// Ignorar warnings específicos si es necesario
LogBox.ignoreLogs([
  'Warning: ...',  // Agrega aquí warnings específicos que quieras ignorar
]);

// Manejador global de errores
if (__DEV__) {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (args[0]?.includes?.('Setting a timer')) return;
    originalConsoleError.apply(console, args);
  };
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          dispatch(setToken(token));
        }
      } catch (error) {
        console.error('Error al cargar el token:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadToken();
  }, [dispatch]);

  console.log('App rendering, __DEV__:', __DEV__); // Para debug

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <RootNavigator />
            {__DEV__ && <DevMenuContainer />}
            {/* Botón de prueba */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 20,
                top: 100,
                backgroundColor: 'blue',
                padding: 10,
                borderRadius: 20,
                zIndex: 9999,
              }}
              onPress={() => console.log('Test button pressed')}
            >
              <Text style={{ color: 'white' }}>TEST</Text>
            </TouchableOpacity>
          </View>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App; 