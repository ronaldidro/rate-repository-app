import { gql } from "@apollo/client";

import { REPOSITORY_FIELDS, REVIEW_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...repositoryFields
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  ${REPOSITORY_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...repositoryFields
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...reviewFields
            user {
              username
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }

  ${REPOSITORY_FIELDS}
  ${REVIEW_FIELDS}
`;

export const GET_CURRENT_USER = gql`
  query ($includeReviews: Boolean = false) {
    me {
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...reviewFields
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }

  ${REVIEW_FIELDS}
`;
