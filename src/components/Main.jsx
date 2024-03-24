import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import { useQuery } from "@apollo/client";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import { GET_CURRENT_USER } from "../graphql/queries";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  const { loading, data } = useQuery(GET_CURRENT_USER);

  if (loading) return null;

  return (
    <View style={styles.container}>
      <AppBar isSigned={data.me?.username} />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/repositories" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/repositories" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
