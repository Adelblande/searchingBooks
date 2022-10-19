import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';

import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import {
  Container,
  Content,
  Title,
  Icon,
  HeaderContent,
  CoverOfBook,
  DescriptionContainer,
  DescriptionText,
  Authors,
} from './styles';

interface DetailsProps {
  id: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
  publishedDate: string;
}

export function Details({ route, navigation }) {
  const { user } = useAuth();
  const theme = useTheme();
  const [details, setDetails] = useState({} as DetailsProps);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { id } = route.params;

  const storageFavoritesKey = `@searchingBooks:favorites${user.id}`;

  const authors = useMemo(() => {
    let authorsString = details.authors?.reduce((acc, current) => {
      return `${acc} ${current}, `;
    }, '');

    authorsString = authorsString?.substring(0, authorsString.length - 2);

    authorsString =
      details.authors?.length > 1
        ? `Autores: ${authorsString}`
        : `Autor: ${authorsString}`;

    return `${authorsString} - Publicado em ${new Date(
      details.publishedDate,
    ).toLocaleDateString()}`;
  }, [details.authors]);

  const fetchDetailsById = async () => {
    const { data } = await api.get(`/volumes/${id}`);

    const detailsResponse = {
      id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
      description: data.volumeInfo.description,
      image: data.volumeInfo.imageLinks.thumbnail,
      publishedDate: data.volumeInfo.publishedDate,
    };
    setDetails(detailsResponse);
  };

  const handleFavorite = async () => {
    const favoritesInStorage = await AsyncStorage.getItem(storageFavoritesKey);

    let favorites: DetailsProps[] = [];
    if (favoritesInStorage) {
      favorites = [...JSON.parse(favoritesInStorage)];
      const index = favorites.findIndex(favorite => favorite.id === details.id);
      if (index === -1) {
        favorites.push(details);
        setIsFavorite(true);
      } else {
        favorites.splice(index, 1);
        setIsFavorite(false);
      }
    } else {
      favorites.push(details);
      setIsFavorite(true);
    }
    await AsyncStorage.setItem(storageFavoritesKey, JSON.stringify(favorites));
  };

  useEffect(() => {
    fetchDetailsById();
  }, []);

  useEffect(() => {
    async function verifyFavorite() {
      const favoritesInStorage = await AsyncStorage.getItem(
        storageFavoritesKey,
      );
      if (favoritesInStorage) {
        let favorites: DetailsProps[] = JSON.parse(favoritesInStorage);
        const hasInFavorites = favorites.some(favorite => favorite.id === id);
        setIsFavorite(hasInFavorites);
      }
    }
    verifyFavorite();
  }, []);

  return (
    <Container>
      <Header name={user.name} photo={user?.photo} />
      <Content>
        <HeaderContent>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" color={theme.colors.secundary} />
          </TouchableOpacity>
          <Title>{details?.title}</Title>
          <TouchableOpacity onPress={handleFavorite}>
            <Icon
              name="heart"
              color={isFavorite ? theme.colors.attention : theme.colors.text}
            />
          </TouchableOpacity>
        </HeaderContent>
        <Authors>{`${authors}`}</Authors>
        <CoverOfBook source={{ uri: details.image }} />
        <DescriptionContainer>
          <DescriptionText>{details.description}</DescriptionText>
        </DescriptionContainer>
      </Content>
    </Container>
  );
}
