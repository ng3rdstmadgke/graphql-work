const Query = {
  posts(parent, args, {db}, info) {
    if (!args.query) {
      return db.posts
    }
    return db.posts.filter((post) => {
      const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
      const isAuthorMatch = post.author.toLowerCase().includes(args.query.toLowerCase())
      return isTitleMatch || isAuthorMatch
    })
  }
}

module.exports = Query