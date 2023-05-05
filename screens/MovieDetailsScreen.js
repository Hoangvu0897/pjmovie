import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { getMovieDetails } from "../services/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthContext from "../Auth/AuthContext";

const MovieDetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const { addToFavorites } = useContext(AuthContext);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await getMovieDetails(movieId);
      setMovieDetails(details);
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <Text>Loading...</Text>;
  }

  const { title, poster_path, vote_average, overview, release_date } =
    movieDetails;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const handleAddToFavorites = () => {
    addToFavorites(movieDetails);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.poster}
          resizeMode="cover"
        />
      </View>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{vote_average}</Text>
          <Text style={styles.ratingLabel}>/10</Text>
        </View>
        <Text style={styles.releaseDate}>Release date: {release_date}</Text>
        <Text style={styles.overview}>{overview}</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleAddToFavorites}
        >
          <Text style={styles.favoriteButtonText}>Add to favorites</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  poster: {
    width: "100%",
    height: 700,
  },
  details: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  rating: {
    fontSize: 32,
    fontWeight: "bold",
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  releaseDate: {
    fontSize: 18,
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    marginBottom: 16,
  },
  favoriteButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
  },
  favoriteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default MovieDetailsScreen;
