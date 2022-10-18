import React from 'react';
import { TouchableOpacity } from 'react-native';

import {
  Container,
  Wrapper,
  UserContainer,
  Photo,
  GreetingContainer,
  Greeting,
  UserName,
  Icon,
  ProvisoryPhoto,
  WrapperToNav,
} from './styles';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  name: string;
  photo?: string;
}

export function Header({ name, photo }: HeaderProps) {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  return (
    <Container>
      <Wrapper>
        <UserContainer>
          {photo ? (
            <Photo source={{ uri: photo }} />
          ) : (
            <ProvisoryPhoto name="smile" />
          )}
          <GreetingContainer>
            <Greeting>Olá,</Greeting>
            <UserName>{name}</UserName>
          </GreetingContainer>
        </UserContainer>
        <WrapperToNav>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <Icon name="heart" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signOut()}>
            <Icon name="log-out" />
          </TouchableOpacity>
        </WrapperToNav>
      </Wrapper>
    </Container>
  );
}
