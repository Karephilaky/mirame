import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import BookingScreen from '../screens/Home/BookingScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import ManageEmployeesScreen from '../screens/Admin/ManageEmployeesScreen';
import ManageStoresScreen from '../screens/Admin/ManageStoresScreen';
import ProductScreen from '../screens/Products/ProductScreen';
import ReservationScreen from '../screens/Reservations/ReservationScreen';
import ServiceScreen from '../screens/Services/ServiceScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
return (

<Tab.Navigator
screenOptions={({ route }: { route: { name: string } }) => ({
tabBarIcon: ({ color, size }: { color: string; size: number }) => {
let iconName: string;
switch (route.name) {
case 'Home':
iconName = 'home';
break;
case 'Booking':
iconName = 'calendar';
break;
case 'Register':
iconName = 'person-add';
break;
case 'Login':
iconName = 'log-in';
break;
case 'ForgotPassword':
iconName = 'key';
break;
case 'ManageEmployees':
iconName = 'people';
break;
case 'ManageStores':
iconName = 'storefront';
break;
case 'Products':
iconName = 'cart';
break;
case 'Reservations':
iconName = 'clipboard';
break;
case 'Services':
iconName = 'construct';
break;
default:
iconName = 'alert';
break;
}
return ;
},
})}
>
<Tab.Screen name="Home" component={HomeScreen} />
<Tab.Screen name="Booking" component={BookingScreen} />
<Tab.Screen name="Register" component={RegisterScreen} />
<Tab.Screen name="Login" component={LoginScreen} />
<Tab.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
<Tab.Screen name="ManageEmployees" component={ManageEmployeesScreen} />
<Tab.Screen name="ManageStores" component={ManageStoresScreen} />
<Tab.Screen name="Products" component={ProductScreen} />
<Tab.Screen name="Reservations" component={ReservationScreen} />
<Tab.Screen name="Services" component={ServiceScreen} />
</Tab.Navigator>

);
};

export default AppNavigator;