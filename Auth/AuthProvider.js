import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const signIn = async (userData) => {
    const { email, password } = userData;

    try {
      const storedUser = await AsyncStorage.getItem(email); // lấy đối tượng user theo email
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === password) {
          setUser(user);
          await AsyncStorage.setItem("user", JSON.stringify(user));
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log("Lỗi khi đăng nhập:", error);
      alert("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.");
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    AsyncStorage.removeItem("user");
  };
  const addToFavorites = async (movie) => {
    if (!user) {
      alert("Vui lòng đăng nhập để thêm phim vào danh sách yêu thích.");
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem(user.email);
      if (storedUser) {
        const updatedUser = JSON.parse(storedUser);
        if (!updatedUser.favoriteMovies) {
          updatedUser.favoriteMovies = [];
        }
        updatedUser.favoriteMovies.push(movie);
        await AsyncStorage.setItem(user.email, JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Phim đã được thêm vào danh sách yêu thích.");
      }
    } catch (error) {
      console.log("Lỗi khi thêm phim vào danh sách yêu thích:", error);
      alert(
        "Có lỗi xảy ra khi thêm phim vào danh sách yêu thích. Vui lòng thử lại."
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        addToFavorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
