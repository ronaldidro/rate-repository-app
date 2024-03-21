import { StyleSheet, View } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  alignVerticalCenter: {
    display: "flex",
    alignItems: "center",
  },
});

const format = (number, base = 1000, decimals = 1, suffix = "k") => {
  if (number < 1000) return number;

  return `${
    Math.round((number / base) * 10 ** decimals) / 10 ** decimals
  }${suffix}`;
};

const StatItem = ({ value, label }) => {
  return (
    <View style={styles.alignVerticalCenter}>
      <Text fontWeight="bold" style={{ fontSize: 18 }}>
        {format(value)}
      </Text>
      <Text style={{ fontSize: 18 }}>{label}</Text>
    </View>
  );
};

export default StatItem;
