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
  Message,
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

  return (
    <Container>
      <Header name={user.name} photo={user?.photo} />
      <HeaderContent>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <Icon name="arrow-left" />
        </TouchableOpacity>
        <Title>Favoritos</Title>
      </HeaderContent>
      <Content>
        {user.favorites.length === 0 && (
          <Message>Você não tem favoritos.</Message>
        )}
        {user?.favorites?.map(favorite => (
          <TouchableOpacity
            key={favorite.id}
            onPress={() => navigation.navigate('details', { id: favorite.id })}>
            <FavoriteCard>
              <Image
                source={{ uri: favorite.image }}
                style={{
                  width: 80,
                  height: 100,
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
