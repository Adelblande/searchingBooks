import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  max-width: 280px;
  margin-top: 8px;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secundary};
  font-size: 32px;
  margin-left: 8px;
`;

export const Input = styled(TextInput)`
  width: 90%;
  height: 50px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.secundary};
  margin: 16px 0;
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.secundary};
  font-size: ${RFValue(18)}px;
`;

export const SearchContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const BooksContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 24px;
  margin-right: 24px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Message = styled.Text`
  margin: 24px;
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.attention};
`;

export const NotImage = styled.View`
  justify-content: center;
  align-items: center;
  width: ${(width - 68) / 2}px;
  height: 230px;
  margin-right: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.text};
`;
