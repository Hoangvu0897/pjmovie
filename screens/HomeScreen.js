import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { getPopularMovies, getGenres } from '../services/api';
import MovieCard from '../components/MoviesCard';
const HomeScreen = ({ navigation }) => {
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenresAndMovies = async () => {
            const fetchedGenres = await getGenres();
            const randomFeaturedMovies = await getPopularMovies();

            setFeaturedMovies(randomFeaturedMovies.slice(0, 4));
            setGenres(fetchedGenres);
        };

        fetchGenresAndMovies();
    }, []);

    const handleMovieSelect = (movie) => {
        navigation.navigate('MovieDetails', { movie });
    };

    const renderMoviesByGenre = ({ item }) => (
        <View style={styles.genreContainer}>
            <Text style={styles.genreTitle}>{item.name}</Text>
            <FlatList
                data={item.movies}
                renderItem={({ item }) => (
                    <MovieCard movie={item} onSelect={() => handleMovieSelect(item)} />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
            />
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.featuredTitle}>Featured Movies</Text>
            <FlatList
                data={featuredMovies}
                renderItem={({ item }) => (
                    <MovieCard movie={item} navigation={navigation} onSelect={() => handleMovieSelect(item)} />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal
            />
            <FlatList
                data={genres}
                renderItem={renderMoviesByGenre}
                keyExtractor={(item) => item.id.toString()}
                onEndReachedThreshold={0.5}
                extraData={genres}
                ListFooterComponent={<View style={styles.footerSpacing}></View>}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    featuredTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
    },
    genreContainer: {
        marginBottom: 10,
    },
    genreTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
    },
    footerSpacing: {
        marginBottom: 30,
    },
});

export default HomeScreen;

