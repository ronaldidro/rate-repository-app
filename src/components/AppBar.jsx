import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColors.appBar,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

const AppBarTab = ({ path, label, style }) => {
  return (
    <Pressable style={style}>
      <Link to={path}>
        <Text fontWeight="bold" style={styles.text}>
          {label}
        </Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={{ padding: 20 }}>
        <AppBarTab path="/" label="Repositories" style={{ paddingRight: 20 }} />
        <AppBarTab path="/sign-in" label="Sign in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
