import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

let originalData = [];

const App = () => {
  const [mydata, setMydata] = useState([]);

  useEffect(() => {
    fetch('https://mysafeinfo.com/api/data?list=horsebreeds&format=json&case=default')
        .then((response) => response.json())
        .then((myJson) => {
          originalData = myJson;
          setMydata(myJson); // Display full list by default
        })
        .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const filterData = (text) => {
    if (text) {
      const filteredData = originalData.filter((item) =>
          item.Breed.toLowerCase().includes(text.toLowerCase())
      );
      setMydata(filteredData);
    } else {
      // Reset to the full list when the search is empty
      setMydata(originalData);
    }
  };

  const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.Breed}</Text>
        <Text style={styles.itemText}>{item.ID}</Text>
      </View>
  );

  return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.header}>Search Horse Breeds:</Text>
        <TextInput
            style={styles.searchInput}
            placeholder="Type to search..."
            onChangeText={(text) => filterData(text)}
        />
        <FlatList
            data={mydata}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'beige',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default App;
