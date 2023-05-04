import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CustomDrawerContent from './components/CustomDrawerContent';
import { getGenres } from './services/api';
import AuthProvider from './Auth/AuthProvider';
const Drawer = createDrawerNavigator();

const App = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const fetchedGenres = await getGenres();
      setGenres(fetchedGenres);
    };

    fetchGenres();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} genres={genres} />}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} options={{ drawerLabel: () => null }} />
          <Drawer.Screen name="Register" component={RegisterScreen} options={{ drawerLabel: () => null }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

