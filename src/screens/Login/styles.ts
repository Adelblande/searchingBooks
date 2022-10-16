import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.shape};
  font-size: 20px;
`;

export const ButtonLogin = styled.View`
  justify-content: center;
  align-items: center;
  width: ${RFValue(200)}px;
  height: ${RFValue(40)}px;
  border-radius: 8px;
  margin-top: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
