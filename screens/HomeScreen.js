import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import MovieCard from "../components/MoviesCard";
import SearchBar from "../components/SearchBar";
import {
  getPopularMovies,
  getGenres,
  getMoviesBySearch,
  getMoviesByGenre,
} from "../services/api";
import { SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchGenresAndMovies = useCallback(async () => {
    const fetchedGenres = await getGenres();
    const randomFeaturedMovies = await getPopularMovies();

    setFeaturedMovies(randomFeaturedMovies.slice(0, 4));

    const genresWithMovies = await Promise.all(
      fetchedGenres.map(async (genre) => {
        const randomMovies = await getMoviesByGenre(genre.id);
        return { ...genre, movies: randomMovies.slice(0, 5) };
      })
    );

    setGenres(genresWithMovies);
  }, []);

  useEffect(() => {
    fetchGenresAndMovies();
  }, [fetchGenresAndMovies]);

  useFocusEffect(
    useCallback(() => {
      fetchGenresAndMovies();
    }, [fetchGenresAndMovies])
  );
  const resetSearch = () => {
    setSearchQuery("");
  };

  const handleViewMore = (genre) => {
    navigation.navigate("GenreMoviesScreen", {
      genreId: genre.id,
    });
  };

  const handleMovieSelect = (movie) => {
    navigation.navigate("MovieDetailsScreen", { movie });
  };

  const renderMoviesByGenre = ({ item }) => (
    <View style={styles.genreContainer}>
      <View style={styles.genreHeader}>
        <Text style={styles.genreTitle}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleViewMore(item)}>
          <Text style={styles.viewMore}>Xem thêm</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={item.movies}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            navigation={navigation}
            onSelect={() => handleMovieSelect(item)}
            titleColor="#FFF"
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    </View>
  );

  const handleSearch = async (query) => {
    if (query) {
      const searchedMovies = await getMoviesBySearch(query);
      setFeaturedMovies(searchedMovies);
      setGenres([]);
    } else {
      const fetchedGenres = await getGenres();
      const randomFeaturedMovies = await getPopularMovies();

      setFeaturedMovies(randomFeaturedMovies.slice(0, 4));
      setGenres(fetchedGenres);
    }
  };
  const FeaturedMoviesBackground = ({ children }) => {
    return (
      <ImageBackground
        source={require("../pics/—Pngtree—movie shooting silhouette film festival_1055345.jpg")} // Thay đổi đường dẫn này thành đường dẫn đến hình ảnh của bạn
        style={styles.featuredMoviesBackground}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    );
  };
  const ListHeaderComponent = () => (
    <>
      <SearchBar onSubmit={handleSearch} resetSearch={resetSearch} />
      {featuredMovies.length > 0 && (
        <FeaturedMoviesBackground>
          <Text style={styles.featuredTitle}>Phim Hay Lúc Này</Text>
          <FlatList
            data={featuredMovies}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                navigation={navigation}
                onSelect={() => handleMovieSelect(item)}
                style={styles.featuredMovieCard}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
          />
        </FeaturedMoviesBackground>
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={genres}
        renderItem={renderMoviesByGenre}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={ListHeaderComponent} // Add ListHeaderComponent
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 15,
    color: "#FFF",
  },
  genreContainer: { marginBottom: 20 },
  genreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 20,
  },
  genreTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  viewMore: {
    fontSize: 16,
    color: "#1E90FF",
  },
  featuredMovieCard: {
    width: 100, // Change the width
    height: 210, // Change the height
  },
  featuredMoviesBackground: {
    width: "100%",
    paddingBottom: 10,
  },
});

export default HomeScreen;
