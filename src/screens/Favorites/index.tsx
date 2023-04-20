import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Content,
  FavoriteCard,
  HeaderContent,
  Icon,
  TextCard,
  Title,
} from './styles';

interface DetailsProps {
  id: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
}

export function Favorites() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState<DetailsProps[]>(
    [] as DetailsProps[],
  );

  const storageFavoritesKey = `@searchingBooks:favorites${user.id}`;

  useEffect(() => {
    async function verifyFavorite() {
      const favoritesInStorage = await AsyncStorage.getItem(
        storageFavoritesKey,
      );
      if (favoritesInStorage) {
        const favoriteList: DetailsProps[] = JSON.parse(favoritesInStorage);

        setFavorites(favoriteList);
      }
    }
    verifyFavorite();
  }, []);

  return (
    <Container>
      <Header name={user.name} photo={user?.photo} />
      <HeaderContent>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" />
        </TouchableOpacity>
        <Title>Favoritos</Title>
      </HeaderContent>
      <Content>
        {favorites.map(favorite => (
          <TouchableOpacity
            key={favorite.id}
            onPress={() => navigation.navigate('details', { id: favorite.id })}>
            <FavoriteCard>
              <Image
                source={{ uri: favorite.image }}
                style={{
                  width: 80,
                  height: 84,
                  borderRadius: 4,
                  marginRight: 12,
                }}
              />
              <TextCard>{favorite.title}</TextCard>
            </FavoriteCard>
          </TouchableOpacity>
        ))}
      </Content>
    </Container>
  );
}
