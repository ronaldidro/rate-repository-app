import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useApolloClient } from "@apollo/client";
import { Link, useNavigate } from "react-router-native";
import Constants from "expo-constants";

import Text from "./Text";
import theme from "../theme";
import useAuthStorage from "../hooks/useAuthStorage";

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

const AppBarTab = ({ label, style, path, handlePress }) => {
  const content = (
    <View style={style}>
      <Text fontWeight="bold" style={styles.text}>
        {label}
      </Text>
    </View>
  );

  return path ? (
    <Link to={path}>{content}</Link>
  ) : (
    <Pressable onPress={handlePress}>{content}</Pressable>
  );
};

const AppBar = ({ isSigned }) => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={{ padding: 20 }}>
        {isSigned ? (
          <>
            <AppBarTab
              label="Repositories"
              path="/repositories"
              style={{ paddingRight: 20 }}
            />
            <AppBarTab label="Sign out" handlePress={logout} />
          </>
        ) : (
          <AppBarTab label="Sign in" path="/" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
