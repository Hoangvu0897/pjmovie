import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AuthContext from '../Auth/AuthContext';

const CustomDrawerContent = (props) => {
    const { user, signOut } = useContext(AuthContext);
    const { genres } = props;
    const handleSignOut = () => {
        signOut();
        props.navigation.closeDrawer();
    };

    return (
        <View style={styles.container}>
            {user && (
                <Text style={styles.welcome}>
                    Xin Chào, {user.username}
                </Text>
            )}
            <DrawerItem label="Home" onPress={() => props.navigation.navigate('Home')} />
            {user ? (
                <DrawerItem label="Đăng xuất" onPress={handleSignOut} />
            ) : (
                <>
                    <DrawerItem label="Đăng nhập" onPress={() => props.navigation.navigate('Login')} />
                    <DrawerItem label="Đăng ký" onPress={() => props.navigation.navigate('Register')} />
                </>
            )}
            <Text style={styles.genresTitle}>Thể loại</Text>
            {genres.map((genre) => (
                <DrawerItem
                    key={genre.id}
                    label={genre.name}
                    onPress={() => {
                        props.navigation.navigate('Home', { genreId: genre.id });
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
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
    },
    genresTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
    },
});

export default CustomDrawerContent;
