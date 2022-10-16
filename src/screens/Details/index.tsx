import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header';
import { Container, Title } from './styles';

export function Details({ navigation }) {
  return (
    <Container>
      <Header />
      {/* <TouchableOpacity onPress={navigation.goBack()}> */}
      <Title>flajslkjkasldjfas</Title>
      {/* </TouchableOpacity> */}
    </Container>
  );
}
