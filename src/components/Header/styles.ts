import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  justify-content: center;
  height: ${RFPercentage(10)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const UserContainer = styled.View`
  flex-direction: row;
`;

export const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: ${RFValue(24)}px;
`;

export const GreetingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

export const Greeting = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  margin-right: 8px;
`;

export const UserName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.shape};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.secundary};
`;

export const ProvisoryPhoto = styled(Feather)`
  font-size: ${RFValue(48)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
`;
