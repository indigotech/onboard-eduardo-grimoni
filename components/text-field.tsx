import React from 'react';
import {StyledTextInput, ErrorCaption} from './styles';
import {TextInputProps} from 'react-native';

interface TextFieldProps extends TextInputProps {
  error?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  keyboardType,
  autoCapitalize,
  value,
  onChangeText,
  error,
  ...rest
}) => {
  return (
    <>
      <StyledTextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={onChangeText}
        error={!!error}
        {...rest}
      />
      {error && <ErrorCaption>{error}</ErrorCaption>}
    </>
  );
};
