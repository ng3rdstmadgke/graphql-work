const Mutation = {
  createPost(parent, args, {db, pubsub}, info) {
    const post = {
      id: String(db.posts.length + 1),
      ...args.data
    }

    // データベースの更新
    db.posts.push(post)

    // サブスクリプションの発行
    pubsub.publish("post", {
      post: {
        mutation: "CREATED",
        data: post
      }
    })
    return post
  },

  updatePost(parent, args, {db, pubsub}, info) {
    const {id, data} = args
    const post = db.posts.find((post) => post.id == id)
    if (!post) {
      throw new Error(`Post not found id = ${id}`)
    }
    if (typeof data.title !== "string" || typeof data.author !== "string") {
      return post
    }

    // データベースの更新
    post.title = data.title
    post.author = data.author

    // サブスクリプションの発行
    pubsub.publish("post", {
      post: {
        mutation: "UPDATED",
        data: post
      }
    })
    return post
  },

  deletePost(parent, args, {db, pubsub}, info) {
    const id = args.id
    const post = db.posts.find((post) => post.id == id)
    const postIndex = db.posts.findIndex((post) => post.id == id)
    if (post === -1) {
      throw new Error(`Post not found id = ${id}`)
    }
    // データベースの更新
    db.posts.splice(postIndex, 1)

    // サブスクリプションの発行
    pubsub.publish("post", {
      post: {
        mutation: "DELETED",
        data: post
      }
    })
    return post
  }
}

module.exports = Mutation