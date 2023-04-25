import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';
import RenderHtml, {
  HTMLElementModel,
  HTMLContentModel,
} from 'react-native-render-html';
import { Dimensions } from 'react-native';

import { Header } from '../../components/Header';
import { useUser } from '../../hooks/user';
import { api } from '../../services/api';
import {
  Container,
  Content,
  Title,
  Icon,
  HeaderContent,
  CoverOfBook,
  Authors,
} from './styles';

interface BookProps {
  id: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
}

interface DetailsProps {
  id: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
  publishedDate: string;
}

export function Details({ route, navigation }) {
  const { user, updateUser } = useUser();
  const theme = useTheme();
  const [details, setDetails] = useState({} as DetailsProps);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { id } = route.params;
  const { width } = Dimensions.get('window');

  const storageFavoritesKey = `@searchingBooks:favorites${user.id}`;

  const textHtml = useMemo(() => {
    return {
      html: details.description,
    };
  }, [details.description]);

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

    console.log('Adel-->', data);

    const detailsResponse = {
      id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
      description: data.volumeInfo.description,
      image:
        data.volumeInfo.imageLinks.medium ??
        data.volumeInfo.imageLinks.thumbnail,
      publishedDate: data.volumeInfo.publishedDate,
    };
    setDetails(detailsResponse);
  };

  const handleFavorite = async () => {
    const favorites: BookProps[] = user?.favorites;

    if (favorites.length > 0) {
      const index = favorites.findIndex(favorite => favorite.id === details.id);
      if (index === -1) {
        setIsFavorite(true);
        favorites.push(details);
      } else {
        setIsFavorite(false);
        favorites.splice(index, 1);
      }
    } else {
      setIsFavorite(true);
      favorites.push(details);
    }
    await updateUser({ ...user, favorites });
  };

  useEffect(() => {
    fetchDetailsById();
  }, []);

  useEffect(() => {
    async function verifyFavorite() {
      const hasInFavorites = user.favorites.some(
        favorite => favorite.id === id,
      );
      setIsFavorite(hasInFavorites);
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
        {!!textHtml.html && (
          <RenderHtml
            contentWidth={width}
            source={textHtml}
            baseStyle={{
              textAlign: 'justify',
              fontFamily: theme.fonts.medium,
              fontSize: '16px',
              color: theme.colors.text,
              marginBottom: 40,
              marginTop: 10,
            }}
          />
        )}
      </Content>
    </Container>
  );
}
