import { Alert, StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";

import Text from "./Text";
import Button from "./Button";
import { DELETE_REVIEW } from "../graphql/mutations";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 10,
    backgroundColor: "white",
  },
  rating: {
    width: 42,
    height: 42,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
});

const formatDate = (date) => date.split("T")[0].split("-").reverse().join(".");

const showAlert = (handleDelete) =>
  Alert.alert("Delete Review", "Are you sure you want to delete this review?", [
    { text: "Cancel", style: "cancel" },
    { text: "Delete", onPress: handleDelete },
  ]);

const ReviewItem = ({
  id,
  header,
  rating,
  createdAt,
  text,
  showActions = false,
  repositoryId,
  refetchData,
}) => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);

  const onDelete = async () => {
    await mutate({ variables: { deleteReviewId: id } });
    refetchData();
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.rating}>
          <Text
            fontWeight="bold"
            style={{ fontSize: 18, color: theme.colors.primary }}
          >
            {rating}
          </Text>
        </View>
        <View style={{ flexGrow: 1, flexShrink: 1 }}>
          <Text fontWeight="bold" style={{ fontSize: 18 }}>
            {header}
          </Text>
          <Text style={{ fontSize: 18, paddingBottom: 5, color: "gray" }}>
            {formatDate(createdAt)}
          </Text>
          <Text style={{ fontSize: 18, flexGrow: 1 }}>{text}</Text>
        </View>
      </View>
      {showActions && (
        <View style={styles.actionsContainer}>
          <Button handlePress={() => navigate(`/${repositoryId}`)}>
            View repository
          </Button>
          <Button
            style={{ backgroundColor: theme.colors.error }}
            handlePress={() => showAlert(onDelete)}
          >
            Delete review
          </Button>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
