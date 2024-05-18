import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ScrollView,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [latestMovie, setLatestMovie] = useState(null);
  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
    fetchLatestMovie();
    fetchNewMovies();
  }, []);

  const fetchNewMovies = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/shows?page=0&embed=cast');
      const data = await response.json();
      setNewMovies(data);
    } catch (error) {
      console.error('Error fetching new movies:', error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchLatestMovie = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/shows/1');
      const data = await response.json();
      setLatestMovie(data);
    } catch (error) {
      console.error('Error fetching latest movie:', error);
    }
  };

  const handleMoviePress = (movie) => {
      if (movie) {
        navigation.navigate('Details', { movie });
      }
    };

  const handleNewMoviePress = (movie) => {
    if (movie) {
            navigation.navigate('NewNetflixDetails', { movie });
     }
  }

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity style={styles.movieContainer} onPress={() => handleMoviePress(item)}>
      <Image source={{ uri: item.show.image && item.show.image.medium }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.show.name}</Text>
    </TouchableOpacity>
  );

  const renderNewMovieItem = ({ item }) => (
    <TouchableOpacity style={styles.movieContainer} onPress={() => handleNewMoviePress(item)}>
      <Image source={{ uri: item.image && item.image.medium }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
     <StatusBar style="auto" />
          <View style={styles.header}>
            <Image source={require('C:/netflix/my-project/android/app/src/main/res/drawable/transparent.png')} style={styles.logo} />
          </View>
      <ScrollView>
        {latestMovie && (
          <TouchableOpacity style={styles.latestMovieContainer} onPress={() => handleMoviePress(latestMovie)}>
            <Image source={{ uri: latestMovie.image && latestMovie.image.medium }} style={styles.latestMovieImage} />
            <View style={styles.latestMovieContent}>
              <Text style={styles.latestMovieTitle}>{latestMovie.name}</Text>
              <TouchableOpacity style={styles.watchNowButton}>
                <Text style={styles.watchNowButtonText}>Watch Now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        <Text style={styles.sectionTitle}>Trending Movies</Text>
        <FlatList
          horizontal
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.show.id.toString()}
        />
        <Text style={styles.sectionTitle}>New on Netflix</Text>
        <FlatList
          horizontal
          data={newMovies}
          renderItem={renderNewMovieItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  latestMovieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  latestMovieImage: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    marginRight: 10,
  },
  latestMovieContent: {
    flex: 1,
  },
  latestMovieTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
  logo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
  watchNowButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  watchNowButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  movieContainer: {
    marginRight: 10,
  },
  movieImage: {
    width: 120,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  movieTitle: {
    color: 'white',
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
});
