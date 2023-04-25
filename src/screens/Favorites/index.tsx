import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header';
import { useUser } from '../../hooks/user';
import {
  Container,
  Content,
  FavoriteCard,
  HeaderContent,
  Icon,
  TextCard,
  Title,
} from './styles';

interface BookProps {
  id: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
}

export function Favorites() {
  const { user } = useUser();
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState<BookProps[]>([] as BookProps[]);

  const storageFavoritesKey = `@searchingBooks:favorites${user.id}`;

  useEffect(() => {
    async function verifyFavorite() {
      const favoritesInStorage = await AsyncStorage.getItem(
        storageFavoritesKey,
      );
      if (favoritesInStorage) {
        const favoriteList: BookProps[] = JSON.parse(favoritesInStorage);

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
        {user?.favorites?.map(favorite => (
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
