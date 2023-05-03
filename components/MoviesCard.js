import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const MovieCard = ({ movie, onPress }) => {
    const { title, poster_path, vote_average } = movie;
    const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`; // Thay bằng đường dẫn hình ảnh thích hợp

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(movie)}>
            <Image source={{ uri: imageUrl }} style={styles.poster} resizeMode="cover" />
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.rating}>Rating: {vote_average}/10</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        overflow: 'hidden',
        width: '80%',
        marginBottom: 16,
    },
    poster: {
        width: '100%',
        height: 300,
    },
    details: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    rating: {
        fontSize: 16,
    },
});

export default MovieCard;
