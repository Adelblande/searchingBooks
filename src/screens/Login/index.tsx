import React from 'react';
import { ButtonLogin, Container, Icon, TextButton, Title } from './styles';
import { useTheme } from 'styled-components';
import { StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../hooks/auth';

export function Login() {
  const theme = useTheme();
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log('handleSignInWithGoogle-->', error);
      Alert.alert('Não foi possivel fazer o login.');
    }
  }

  return (
    <Container>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />
      <Icon name="book-open" />
      <Title>Searching books</Title>
      <TouchableOpacity onPress={handleSignInWithGoogle}>
        <ButtonLogin>
          <TextButton>Entrar com Google</TextButton>
          <Icon name="log-in" />
        </ButtonLogin>
      </TouchableOpacity>
    </Container>
  );
}
