import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { Header } from '../../components/Header';
import {
  Container,
  Input,
  SearchContainer,
  Icon,
  BooksContainer,
  Message,
  Title,
  NotImage,
} from './styles';

import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

interface ResultsProps {
  id: string;
  title: string;
  image: string;
}

export function Home() {
  const { user } = useAuth();

  const [search, setSearch] = useState('');
  const [results, setResults] = useState([] as ResultsProps[]);
  const [startIndex, setStartIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [totalResults, setTotalResults] = useState(0);

  const MAX_RESULTS = 10;

  const theme = useTheme();
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!search) {
      return setMessage(
        'Digite ao menos parte do título que deseja pesquisar.',
      );
    }

    try {
      setMessage('');
      const { data } = await api.get(
        `/volumes?q=${search}+intitle:${search}&startIndex=${startIndex}&maxResults=${MAX_RESULTS}`,
      );

      setTotalResults(data.totalItems);

      const dataResults = data.items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        image: item.volumeInfo.imageLinks?.thumbnail,
      }));

      setResults(state => [...state, ...dataResults]);
    } catch (error) {
      return setMessage('Algo deu errado.');
    }
  };

  const handleMoreSearch = useCallback(() => {
    if (results.length < totalResults) {
      setStartIndex(state => state + MAX_RESULTS);
    }
  }, [results.length, totalResults]);

  const handleNavigationToDetails = (id: string) => {
    navigation.navigate('Details', { id });
  };

  useEffect(() => {
    !!startIndex && handleSearch();
  }, [startIndex]);

  useEffect(() => {
    if (search.length === 0) {
      setResults([]);
    }
  }, [search]);

  return (
    <Container>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <Header name={user.name} photo={user?.photo} />
      <SearchContainer>
        <Input
          placeholder="Digite o título do livro"
          placeholderTextColor={theme.colors.secundary}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" />
        </TouchableOpacity>
      </SearchContainer>
      {!!message && <Message>{message}</Message>}
      <BooksContainer>
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => item.image && handleNavigationToDetails(item.id)}>
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: RFValue(280),
                    height: RFValue(400),
                    marginRight: 16,
                    borderRadius: 8,
                  }}
                />
              ) : (
                <NotImage>
                  <Icon name="camera-off" />
                </NotImage>
              )}
              <Title>{item.title}</Title>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          onEndReached={handleMoreSearch}
        />
      </BooksContainer>
    </Container>
  );
}
