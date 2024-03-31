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
    backgroundColor: theme.colors.appBarBackground,
  },
});

const AppBarTab = ({ label, path, handlePress }) => {
  const content = (
    <View style={{ padding: 15 }}>
      <Text fontWeight="bold" style={{ color: "white", fontSize: 18 }}>
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
      <ScrollView horizontal>
        <AppBarTab path="/" label="Repositories" />
        {isSigned ? (
          <>
            <AppBarTab path="/create-review" label="Create a review" />
            <AppBarTab path="/reviews" label="My reviews" />
            <AppBarTab label="Sign out" handlePress={logout} />
          </>
        ) : (
          <>
            <AppBarTab path="/sign-up" label="Sign up" />
            <AppBarTab path="/sign-in" label="Sign in" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
