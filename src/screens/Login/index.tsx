import React from 'react';
import { ButtonLogin, Container, Icon, Title } from './styles';
import { useTheme } from 'styled-components';
import { StatusBar, TouchableOpacity } from 'react-native';

export function Login({ navigation }) {
  const theme = useTheme();
  return (
    <Container>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />
      <Icon name="book-open" />
      <Title>Searching books</Title>
      <TouchableOpacity onPress={() => navigation.push('Home')}>
        <ButtonLogin>
          <Icon name="log-in" />
        </ButtonLogin>
      </TouchableOpacity>
    </Container>
  );
}
