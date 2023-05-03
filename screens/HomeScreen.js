import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Swiper from '../components/Swiper';
import api from '../services/api';

const HomeScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await api.get('/movies'); // Thay bằng đường dẫn API thích hợp
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleMovieSelect = (movie) => {
        navigation.navigate('MovieDetails', { movie });
    };

    return (
        <View style={styles.container}>
            {movies.length > 0 ? (
                <Swiper movies={movies} onMovieSelect={handleMovieSelect} />
            ) : (
                <Text>Loading movies...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default HomeScreen;
