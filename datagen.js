const faker = require("faker");

faker.seed(123);

let data = [];
let limit = 50;
for (let i = 0; i < limit; i++) {
  let value = {
    author: faker.name.firstName(),
    text: faker.name.lastName(),
    id: faker.random.uuid(),
  };
  data = [...data, value];
}

module.exports = data;
