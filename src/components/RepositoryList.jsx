import React, { useState } from "react";
import { FlatList, View, Pressable, StyleSheet } from "react-native";
import { Picker as NativePicker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: "white",
    borderRadius: 4,
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 15,
  },
});

const options = {
  latest: {
    label: "Latest repositories",
    sort: { orderBy: "CREATED_AT", orderDirection: "ASC" },
  },
  highest: {
    label: "Highest rated repositories",
    sort: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  },
  lowest: {
    label: "Lowest rated repositories",
    sort: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  },
};

const RepositoryListHeader = ({
  searchValue,
  onSearchChange,
  selectValue,
  onChangeSelect,
}) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Searchbar
        style={styles.searchbar}
        inputStyle={{ fontSize: 18 }}
        placeholder="Search"
        onChangeText={onSearchChange}
        value={searchValue}
      />
      <NativePicker
        selectedValue={selectValue}
        onValueChange={(item) => onChangeSelect(item)}
      >
        {Object.entries(options).map(([key, value], index) => (
          <NativePicker.Item
            style={{ fontSize: 18 }}
            key={index}
            label={value.label}
            value={key}
          />
        ))}
      </NativePicker>
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchValue, onSearchChange, selectValue, onChangeSelect } =
      this.props;

    return (
      <RepositoryListHeader
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        selectValue={selectValue}
        onChangeSelect={onChangeSelect}
      />
    );
  };

  render() {
    const { repositories, onItemPress, onEndReach } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Pressable onPress={() => onItemPress(item.id)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
      />
    );
  }
}

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedText] = useDebounce(searchQuery, 1000);
  const [selected, setSelected] = useState("latest");
  const navigate = useNavigate();

  const { repositories, fetchMore } = useRepositories({
    first: 4,
    searchKeyword: debouncedText,
    ...options[selected].sort,
  });

  return (
    <RepositoryListContainer
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      selectValue={selected}
      onChangeSelect={setSelected}
      repositories={repositories}
      onItemPress={(id) => navigate(`/${id}`)}
      onEndReach={() => fetchMore()}
    />
  );
};

export default RepositoryList;
