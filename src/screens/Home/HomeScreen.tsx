import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { ROLES } from '../../types/database';
import { commonStyles } from '../../styles/common';

// Importar los dashboards
import AdminDashboard from './Dashboards/AdminDashboard';
import EmployeeDashboard from './Dashboards/EmployeeDashboard';
import ClientDashboard from './Dashboards/ClientDashboard';
import DefaultDashboard from './Dashboards/DefaultDashboard';

const HomeScreen = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const renderContent = () => {
    switch (user?.id_rol) {
      case ROLES.ADMIN:
        return <AdminDashboard />;
      case ROLES.EMPLOYEE:
        return <EmployeeDashboard />;
      case ROLES.CLIENT:
        return <ClientDashboard />;
      default:
        return <DefaultDashboard />;
    }
  };

  return (
    <View style={commonStyles.container}>
      {renderContent()}
    </View>
  );
};

export default HomeScreen;