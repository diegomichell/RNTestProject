/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  SafeAreaView,
} from 'react-native';
import { BASE_API } from './services/api';
import { IPokemonItem } from './types/pokemon';
import { InfoMessage } from './components/InfoMessage';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [pokemonData, setPokemonData] = useState<IPokemonItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const getPokemonData = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(BASE_API);

      if (res.status != 200) {
        throw new Error('Out of service');
      }

      const data = await res.json();

      return data;
    } catch (error: any) {
      setErrorMessage(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderItem = ({ item }: { item: IPokemonItem }) => (
    <View style={styles.item}>
      <Text style={[styles.itemCol, styles.nameCol]}>{item.name}</Text>
      <Text style={styles.itemCol}>{item.url}</Text>
    </View>
  );

  const capitalizeTransform = (item: IPokemonItem) => {
    // diego michel => Diego-Michel
    const nameParts = item.name.split('-').map(namePart => {
      let newNamePart = namePart.split('');
      newNamePart[0] = newNamePart[0].toUpperCase();

      return newNamePart.join('');
    });

    const name = nameParts.join('-');

    return {
      ...item,
      name,
    };
  };

  useEffect(() => {
    getPokemonData().then(data => {
      setPokemonData(data.results.map(capitalizeTransform));
    });
  }, [getPokemonData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {isLoading && <InfoMessage message="Loading Content" />}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {!isLoading && !errorMessage && (
        <FlatList
          data={pokemonData}
          renderItem={renderItem}
          keyExtractor={item => item.url}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#F0E4D3',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemCol: {
    width: '50%',
  },
  nameCol: {
    textTransform: 'capitalize',
  },
});

export default App;
