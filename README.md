# サーバーの起動

```bash
npm install
node server.js
```

http://localhost:4000/graphql にアクセス


# クエリ

## 新規作成

```graphql
mutation {
  createMessage(input: {content: "Hello", author: "midorikawa"}) {
    id
    author
    content
  }
}
```

## 一覧取得

```graphql
query {
  listMessages {
    id
    author
    content
  }
}
```


## 詳細取得

```graphql
query {
  getMessage(id: "cf43da907bb3c8024d96") {
    id
    author
    content
  }
}
```


## アップデート

```graphql
mutation {
  updateMessage(id: "cf43da907bb3c8024d96", input: {
    content: "hogehoge"
    author: "piyopiyo"
  }) {
    id
    author
    content
  }
}
```

## 削除

```graphql
mutation {
  deleteMessage(id: "cf43da907bb3c8024d96")
}
```