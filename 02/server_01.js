const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");


// GraphQLスキーマ言語を記述してスキーマを構築する
// スキーマはあくまで定義のみで、実際のデータ操作はリゾルバ関数で行う
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// リゾルバ関数 (実際のデータ操作を行う)
// リゾルバ関数とは特定のフィールドのデータを返す関数。
const root = {
  hello: () => {
    return "Hello world!";
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