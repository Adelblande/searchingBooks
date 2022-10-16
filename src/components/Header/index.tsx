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
} from './styles';

export function Header() {
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
        <TouchableOpacity>
          <Icon name="power" />
        </TouchableOpacity>
      </Wrapper>
    </Container>
  );
}
