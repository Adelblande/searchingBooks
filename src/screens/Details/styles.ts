import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  width: 100%;
  margin: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  text-align: center;
  width: 270px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secundary};
  font-size: 24px;
  margin-right: 8px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  padding-bottom: 16px;
`;

export const CoverOfBook = styled.Image`
  width: ${RFPercentage(52)}px;
  height: ${RFPercentage(70)}px;
  border-radius: 8px;
`;

export const DescriptionContainer = styled.View`
  padding-top: 24px;
  width: ${RFPercentage(52)}px;
  text-justify: distribute-all-lines;
`;

export const DescriptionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;

export const Authors = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
`;
