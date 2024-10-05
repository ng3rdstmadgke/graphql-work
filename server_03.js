const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
type Query {
  rollDice(numDice: Int!, numSides: Int): [Int]
}
`);

const root = {
  rollDice: ({numDice, numSides}) => {
    return Array.from(Array(numDice).keys()).map((_) => 1 + Math.floor(Math.random() * numSides))
  }
};

// Expressでサーバーを立てる
const app = express();
app.use("/graphql", graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");