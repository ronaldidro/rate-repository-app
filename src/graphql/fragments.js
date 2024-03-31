import { gql } from "@apollo/client";

export const REPOSITORY_FIELDS = gql`
  fragment repositoryFields on Repository {
    id
    description
    forksCount
    fullName
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
    url
  }
`;

export const REVIEW_FIELDS = gql`
  fragment reviewFields on Review {
    id
    text
    rating
    createdAt
  }
`;
