import { Pressable, StyleSheet, View } from "react-native";

import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
});

const Button = ({ children, style, handlePress }) => {
  const buttonStyle = [styles.button, style];

  return (
    <Pressable onPress={handlePress}>
      <View style={buttonStyle}>
        <Text fontWeight="bold" style={{ color: "white", fontSize: 18 }}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
