import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const NewNetflixDetailsScreen = ({ route }) => {
  const { movie } = route.params;

  // Destructuring movie object
  const { name, image, summary } = movie;

  // Function to remove HTML tags from the summary
  const removeTags = (html) => {
    const regex = /(<([^>]+)>)/gi;
    return html ? html.replace(regex, '') : '';
  };

  // Clean summary without HTML tags
  const cleanSummary = removeTags(summary);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image && image.medium }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{name}</Text>
      <Text style={styles.movieSummary}>{cleanSummary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#000000',
  },
  movieImage: {
      width: 200,
      height: 300,
      resizeMode: 'cover',
      marginBottom: 10,
    },
  movieTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  movieSummary: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default NewNetflixDetailsScreen;
