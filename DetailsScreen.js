import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

export default function DetailsScreen({ route }) {
  const { movie, isNew } = route.params;

  const defaultMovie = {
    show: {
      name: '',
      image: { medium: null },
      summary: ''
    }
  };

  const { name, image, summary } = isNew ? movie : movie.show;

  // Function to remove HTML tags from the summary
  const removeTags = (html) => {
    const regex = /(<([^>]+)>)/gi;
    return html ? html.replace(regex, '') : '';
  };

  const cleanSummary = removeTags(summary);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image && image.medium }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{name}</Text>
      <Text style={styles.movieSummary}>{cleanSummary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieImage: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  movieSummary: {
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});
