import { FlatList } from "react-native";

import useMe from "../hooks/useMe";
import ReviewItem from "./ReviewItem";

const Reviews = () => {
  const { user, loading, refetch } = useMe({ includeReviews: true });

  if (loading) return null;

  const reviews = user?.reviews.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <ReviewItem
          id={item.id}
          header={item.repository.fullName}
          rating={item.rating}
          createdAt={item.createdAt}
          text={item.text}
          showActions
          repositoryId={item.repository.id}
          refetchData={refetch}
        />
      )}
    />
  );
};

export default Reviews;
