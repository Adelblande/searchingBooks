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
} from './styles';

export function Header() {
  const navigation = useNavigation();
  return (
    <Container>
      <Wrapper>
        <UserContainer>
          <Photo source={{ uri: 'https://github.com/adelblande.png' }} />
          <GreetingContainer>
            <Greeting>Olá,</Greeting>
            <UserName>Adelblande</UserName>
          </GreetingContainer>
        </UserContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Icon name="log-out" />
        </TouchableOpacity>
      </Wrapper>
    </Container>
  );
}
