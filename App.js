import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/HomeScreen";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CustomDrawerContent from "./components/CustomDrawerContent";
import { getGenres } from "./services/api";
import AuthProvider from "./Auth/AuthProvider";
import GenreMoviesScreen from "./screens/GenreMoviesScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
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
          drawerContent={(props) => (
            <CustomDrawerContent {...props} genres={genres} />
          )}
        >
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Trang Chủ" }}
          />
          <Drawer.Screen
            name="MovieDetailsScreen"
            component={MovieDetailsScreen}
          />
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{ drawerLabel: () => null, title: "Trang Đăng Nhập" }}
          />
          <Drawer.Screen
            name="Register"
            component={RegisterScreen}
            options={{ drawerLabel: () => null, title: "Trang Đăng Ký" }}
          />
          <Drawer.Screen
            name="GenreMoviesScreen"
            component={GenreMoviesScreen}
            options={{ drawerLabel: () => null, title: "Phim Theo Thể Loại" }}
          />
          <Drawer.Screen
            name="UserProfile"
            component={UserProfileScreen}
            options={{ drawerLabel: () => null, title: "Thông Tin Người Dùng" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
