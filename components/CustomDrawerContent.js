import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import AuthContext from "../Auth/AuthContext";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomDrawerContent = (props) => {
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();
  const { genres } = props;
  const isFocused = useIsFocused();

  const handleSignOut = () => {
    signOut();
    props.navigation.closeDrawer();
  };

  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      {user && <Text style={styles.welcome}>Xin Chào, {user.email}</Text>}
      <DrawerItem
        label="Home"
        icon={() => <MaterialIcons name="home" size={24} color="black" />}
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        label="Thông tin người dùng"
        icon={() => <MaterialIcons name="person" size={24} color="black" />}
        onPress={() => props.navigation.navigate("UserProfile")}
      />
      {user ? (
        <DrawerItem
          label="Đăng xuất"
          onPress={handleSignOut}
          icon={() => (
            <MaterialIcons name="exit-to-app" size={24} color="black" />
          )}
        />
      ) : (
        <>
          <DrawerItem
            label="Đăng nhập"
            icon={() => (
              <MaterialIcons name="account-circle" size={24} color="black" />
            )}
            onPress={() => props.navigation.navigate("Login")}
          />
          <DrawerItem
            label="Đăng ký"
            icon={() => (
              <MaterialIcons name="person-add" size={24} color="black" />
            )}
            onPress={() => props.navigation.navigate("Register")}
          />
        </>
      )}
      <Text style={styles.genresTitle}>Thể loại</Text>
      {genres.map((genre) => (
        <DrawerItem
          key={genre.id}
          label={genre.name}
          onPress={() => {
            props.navigation.navigate("GenreMoviesScreen", { genre });
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
  genresTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 10,
  },
});

export default CustomDrawerContent;
