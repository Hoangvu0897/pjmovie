import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

const MovieDetailsScreen = ({ route }) => {
    const { movie } = route.params;
    const { title, poster_path, vote_average, overview, release_date } = movie;
    const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`; // Thay bằng đường dẫn hình ảnh thích hợp

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.poster} resizeMode="cover" />
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.rating}>Rating: {vote_average}/10</Text>
                <Text style={styles.releaseDate}>Release date: {release_date}</Text>
                <Text style={styles.overview}>{overview}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    poster: {
        width: '100%',
        height: 300,
    },
    details: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    rating: {
        fontSize: 18,
        marginBottom: 8,
    },
    releaseDate: {
        fontSize: 18,
        marginBottom: 8,
    },
    overview: {
        fontSize: 16,
    },
});

export default MovieDetailsScreen;
