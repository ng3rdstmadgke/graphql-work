const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
input MessageInput {
  content: String
  author: String
}

type Message {
  id: ID!
  content: String
  author: String
}

type Query {
  listMessages: [Message]!
  getMessage(id: ID!): Message
}

type Mutation {
  createMessage(input: MessageInput): Message
  updateMessage(id: ID!, input: MessageInput): Message
}
`);

class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

const fakeDatabase = {};

const root = {
  listMessages: () => {
    return Object.keys(fakeDatabase).map((key) => {
      return new Message(key, fakeDatabase[key]);
    })
  },

  getMessage: ({id}) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id);
    }
    return new Message(id, fakeDatabase[id]);
  },

  createMessage: ({input}) => {
    const id = require("crypto").randomBytes(10).toString("hex");
    fakeDatabase[id] = input;
    return new Message(id, input);
  },

  updateMessage: ({id, input}) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id);
    }
    fakeDatabase[id] = input;
    return new Message(id, input);
  }
}



// Expressでサーバーを立てる
const app = express();
app.use("/graphql", graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");