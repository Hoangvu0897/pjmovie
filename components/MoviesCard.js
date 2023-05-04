import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { getImageUrl } from '../services/api';
const MovieCard = ({ movie, onSelect, navigation }) => {
    const handlePress = () => {
        navigation.navigate('MovieDetailsScreen', { movieId: movie.id });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: getImageUrl(movie.poster_path) }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <Text onPress={handlePress} style={styles.title} numberOfLines={1}>
                {movie.title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 150,
        height: 225,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        marginTop: 8,
        textAlign: 'center',
    },
});

export default MovieCard;
