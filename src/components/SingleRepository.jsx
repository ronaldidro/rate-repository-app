import { FlatList } from "react-native";
import { useParams } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import useRepository from "../hooks/useRepository";

const SingleRepository = () => {
  const { id: repositoryId } = useParams();
  const { repository, loading, fetchMore } = useRepository({
    repositoryId,
    first: 2,
  });

  if (loading) return null;

  const reviews = repository.reviews.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <ReviewItem
          header={item.user.username}
          rating={item.rating}
          createdAt={item.createdAt}
          text={item.text}
        />
      )}
      ListHeaderComponent={() => (
        <RepositoryItem repository={repository} showButton />
      )}
      onEndReached={() => fetchMore()}
    />
  );
};

export default SingleRepository;
