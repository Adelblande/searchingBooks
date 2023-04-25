import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-bottom: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  width: 80%;
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;

export const Icon = styled(Feather)`
  font-size: 24px;
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.secundary};
`;

export const HeaderContent = styled.View`
  padding: 24px;
  flex-direction: row;
`;

export const Content = styled.ScrollView``;

export const FavoriteCard = styled.View`
  flex-direction: row;
  height: 116px;
  margin: 8px 24px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
`;

export const TextCard = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  max-width: 250px;
`;

export const Message = styled.Text`
  margin: 20px;
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;
