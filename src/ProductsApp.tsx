/* eslint-disable react/react-in-jsx-scope */
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from './presentation/providers/AuthProvider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import { useEffect } from 'react';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const queryclients = new QueryClient();
export const ProductsApp = () => {

  const colorSheme = useColorScheme();
  const theme = colorSheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor = (colorSheme === 'dark') ? theme['color-basic-800'] : theme['color-basic-100'];

  // useEffect(() => {
  //   const checkStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
  //       const response = await axios.get('http://192.168.0.166:3000/api/auth/check-status', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       console.log('✅ Conexión exitosa:', response.data);
  //     } catch (error) {
  //       console.log('❌ Error de conexión:', error.message);
  //     }
  //   };
  //   checkStatus();
  // }, []);


  return (
    <QueryClientProvider client={queryclients}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer theme = {{
          dark:colorSheme === 'dark',
          colors:{
            primary:theme['color-primary-500'],
            background:backgroundColor,
            card: theme['color-basic-100'],
            text: theme['color-basic-color'],
            border:theme['color-basic-800'],
            notification:theme['color-basic-500'],
          },
         }}>
          <AuthProvider>
            <StackNavigator/>
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  );
};
