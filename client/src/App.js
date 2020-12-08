import "./App.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import InfiniteList from "./InfiniteList";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        moreComments: {
          merge(existing, incoming, { readField }) {
            const comments = existing ? { ...existing.comments } : {};
            incoming.comments.forEach((comment) => {
              comments[readField("id", comment)] = comment;
            });
            return {
              cursor: incoming.cursor,
              comments,
            };
          },

          read(existing) {
            if (existing) {
              return {
                cursor: existing.cursor,
                comments: Object.values(existing.comments),
              };
            }
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  uri: "http://localhost:5000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <InfiniteList />
      </div>
    </ApolloProvider>
  );
}

export default App;
