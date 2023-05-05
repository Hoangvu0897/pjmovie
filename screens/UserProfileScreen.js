import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import AuthContext from "../Auth/AuthContext";

const UserProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user && user.favoriteMovies) {
      setFavoriteMovies(user.favoriteMovies);
    }
  }, [user]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.notLogginAlert}>
          Vui lòng đăng nhập để xem thông tin cá nhân.
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

    return (
      <View style={styles.movieItem}>
        <Image source={{ uri: imageUrl }} style={styles.moviePoster} />
        <Text style={styles.movieTitle}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userInfo}>
        Email: {user.email}
        {"\n"}
        Mật khẩu: {user.password}
      </Text>
      <Text style={styles.favoriteMoviesTitle}>Các bộ phim yêu thích:</Text>
      <FlatList
        data={favoriteMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1c1c1c",
  },
  userInfo: {
    fontSize: 16,
    color: "white",
  },
  favoriteMoviesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#fff",
  },
  movieItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  moviePoster: {
    width: 50,
    height: 75,
    marginRight: 16,
  },
  movieTitle: {
    fontSize: 16,
    color: "#fff",
  },
  notLogginAlert: {
    color: "white",
  },
});

export default UserProfileScreen;
