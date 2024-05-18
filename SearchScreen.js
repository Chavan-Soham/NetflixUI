// SearchScreen.js
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearch = () => {
    fetchSearchResults();
  };

  const handleItemClick = (item) => {
    navigation.navigate('Details', { movie: item });
  };

  const renderSearchResultItem = ({ item }) => (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={() => handleItemClick(item)}>
      <Image
        source={{ uri: item.show?.image?.medium }}
        style={{ width: 50, height: 50, marginRight: 10 }}
      />
      <Text style={{ color: 'white' }}>{item.show?.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <TextInput
        placeholder='Search'
        placeholderTextColor='white'
        style={{ backgroundColor: 'black', color: 'white', borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 10 }}
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={searchResults}
        renderItem={renderSearchResultItem}
        keyExtractor={(item) => item.show.id.toString()}
      />
    </View>
  );
};

export default SearchScreen;
