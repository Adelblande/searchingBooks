import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  width: ${width}px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  text-align: center;
  width: 270px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  font-size: 18px;
`;

export const Icon = styled(Feather)`
  font-size: 24px;
  margin-right: 8px;
`;

export const HeaderContent = styled.View`
  justify-content: space-between;
  flex-direction: row;
  padding-bottom: 16px;
`;

export const CoverOfBook = styled.Image`
  margin-top: 10px;
  width: ${width - 48}px;
  height: 540px;
  border-radius: 8px;
`;

export const Authors = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
`;
