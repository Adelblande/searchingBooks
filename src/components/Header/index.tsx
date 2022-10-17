import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
} from './styles';

interface HeaderProps {
  name: string;
  photo?: string;
}

export function Header({ name, photo }: HeaderProps) {
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
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Icon name="log-out" />
        </TouchableOpacity>
      </Wrapper>
    </Container>
  );
}
