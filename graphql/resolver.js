const persons = require("../datagen");

const Query = {
  persons: (_, { cursor, first }) => {
    // first means how many at a time

    // if no cursor given means start from 0.
    // if cursor given then find the index of that cursor and then assign the next one hence +1
    const cursorIndex = !cursor
      ? 0
      : persons.findIndex((person) => person.id === cursor) + 1;

    // getting the slice of persons
    const sliceOfPersons = persons.slice(cursorIndex, cursorIndex + first);

    return {
      edges: sliceOfPersons.map((person) => ({
        cursor: person.id,
        node: { ...person },
      })),
      pageInfo: {
        // getting the id of the last person of that page
        endCursor: sliceOfPersons[sliceOfPersons.length - 1].id,
        hasNextPage: cursorIndex + first < persons.length,
      },
    };
  },
};
module.exports = { Query };
