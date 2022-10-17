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
} from './styles';
import { useAuth } from '../../hooks/auth';

interface HeaderProps {
  name: string;
  photo?: string;
}

export function Header({ name, photo }: HeaderProps) {
  const { signOut } = useAuth();

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
        <TouchableOpacity onPress={() => signOut()}>
          <Icon name="log-out" />
        </TouchableOpacity>
      </Wrapper>
    </Container>
  );
}
