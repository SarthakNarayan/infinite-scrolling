import React from "react";
import { useQuery, gql } from "@apollo/client";
import Person from "./Person";

const MORE_COMMENTS_QUERY = gql`
  query moreComments($cursor: String, $limit: Int!) {
    moreComments(cursor: $cursor, limit: $limit) {
      cursor
      comments {
        id
        author
        text
      }
    }
  }
`;

const InfiniteList = () => {
  const { loading, error, data, fetchMore } = useQuery(MORE_COMMENTS_QUERY, {
    variables: { limit: 5 },
  });

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Some error occurred</h1>;

  return (
    <div>
      <Person
        entries={data.moreComments.comments}
        onLoadMore={() =>
          fetchMore({
            variables: {
              cursor: data.moreComments.cursor,
            },
          })
        }
      />
    </div>
  );
};

export default InfiniteList;
