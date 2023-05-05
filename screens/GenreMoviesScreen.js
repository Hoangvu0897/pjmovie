import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import MovieCard from "../components/MoviesCard";
import { getMoviesByGenre } from "../services/api";

const GenreMoviesScreen = ({ route, navigation }) => {
  const { genreId } = route.params;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      const moviesByGenre = await getMoviesByGenre(genreId);
      setMovies(moviesByGenre);
    };

    fetchMoviesByGenre();
  }, [genreId]);

  const handleMovieSelect = (movie) => {
    navigation.navigate("MovieDetailsScreen", {
      movie,
      navigation: navigation,
    });
  };

  const renderMovieCard = ({ item }) => (
    <MovieCard
      movie={item}
      navigation={navigation}
      onSelect={() => handleMovieSelect(item)}
      style={styles.movieCard}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 10,
  },
  movieCard: {
    flex: 1,
    margin: 5,
  },
});

export default GenreMoviesScreen;
