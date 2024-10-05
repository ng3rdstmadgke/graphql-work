const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
type RandomDie {
  numSides: Int!
  rollOnce: Int!
  roll(numRolls: Int!): [Int]
}

type Query {
  getDie(numSides: Int): RandomDie
}
`);

// リゾルバ関数内の処理はクラス化することも可能
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    return Array.from(Array(numRolls).keys()).map((_) => this.rollOnce());
  }
}

const root = {
  getDie: ({numSides}) => {
    return new RandomDie(numSides || 6);
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