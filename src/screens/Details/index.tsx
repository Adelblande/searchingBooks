import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import {
  Container,
  Content,
  Title,
  Icon,
  HeaderContent,
  CoverOfBook,
  DescriptionContainer,
  DescriptionText,
  Authors,
} from './styles';

interface DetailsProps {
  id: string;
  title: string;
  authors: string[];
  description: string;
  image: string;
}

export function Details({ route, navigation }) {
  const { user } = useAuth();
  const [details, setDetails] = useState({} as DetailsProps);

  const fetchDetailsById = async () => {
    const { data } = await api.get(`/volumes/${route.params.id}`);

    const detailsResponse = {
      id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
      description: data.volumeInfo.description,
      image: data.volumeInfo.imageLinks.thumbnail,
    };
    setDetails(detailsResponse);
  };

  const authors = useMemo(() => {
    let authorsString = details.authors?.reduce((acc, current) => {
      return `${acc} ${current}, `;
    }, '');

    authorsString = authorsString?.substring(0, authorsString.length - 2);

    return authorsString;
  }, [details.authors]);

  useEffect(() => {
    fetchDetailsById();
  }, []);

  return (
    <Container>
      <Header name={user.name} photo={user?.photo} />
      <Content>
        <HeaderContent>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" />
          </TouchableOpacity>
          <Title>{details?.title}</Title>
        </HeaderContent>
        <Authors>{`Autores: ${authors}`}</Authors>
        <CoverOfBook source={{ uri: details.image }} />
        <DescriptionContainer>
          <DescriptionText>{details.description}</DescriptionText>
        </DescriptionContainer>
      </Content>
    </Container>
  );
}
