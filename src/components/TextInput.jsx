import { TextInput as NativeTextInput, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  input: {
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "gray",
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.error, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
