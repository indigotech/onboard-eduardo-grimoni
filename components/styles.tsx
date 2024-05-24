import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
`;

export const UserContainer = styled.View`
  margin-bottom: 10px;
`;

export const UserName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const UserEmail = styled.Text`
  font-size: 16px;
  color: gray;
`;

export const LoadingIndicator = styled.ActivityIndicator`
  margin-top: 20px;
`;

export const BottomRightContainer = styled.View`
  position: absolute;
  bottom: 40px;
  right: 40px;
`;

export const RoundButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: #40e0d0;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

export const PlusSign = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: bold;
`;

export const H1 = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
  height: 44px;
  background-color: #40e0d0;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: normal;
  color: white;
`;

export const FormLabel = styled.Text`
  font-size: 12px;
  font-weight: normal;
  color: #777777;
  margin-bottom: 12px;
`;

export const TextField = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: #777777;
  border-radius: 5px;
  padding-horizontal: 10px;
  margin-bottom: 8px;
`;

export const ErrorCaption = styled.Text`
  font-size: 12px;
  font-weight: normal;
  color: red;
  margin-top: 8px;
`;
