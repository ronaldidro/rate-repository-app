import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import StatItem from "./StatItem";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  profile: {
    display: "flex",
    flexDirection: "row",
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 2,
    marginRight: 15,
  },
  content: {
    flexGrow: 1,
    flexShrink: 1,
  },
  description: {
    fontSize: 18,
    paddingVertical: 5,
    flexGrow: 1,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: "white",
    borderRadius: 2,
    fontSize: 18,
    paddingVertical: 2,
    paddingHorizontal: 5,
    alignSelf: "flex-start",
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    marginHorizontal: 20,
  },
});

const RepositoryItem = ({
  ownerAvatarUrl,
  fullName,
  description,
  language,
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.image} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.content}>
          <Text fontWeight="bold" style={{ fontSize: 18 }}>
            {fullName}
          </Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.language}>{language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <StatItem value={stargazersCount} label="Stars" />
        <StatItem value={forksCount} label="Forks" />
        <StatItem value={reviewCount} label="Reviews" />
        <StatItem value={ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;
