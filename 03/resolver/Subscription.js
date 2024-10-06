const Subscription = {
  post: {
    subscribe(parent, args, {pubsub}, info) {
      // イベントを非同期でlistenする。引数にはMutationのリゾルバ関数ないの pubsub.publish の第一引数で指定したトピック名が入る。
      return pubsub.asyncIterator("post")
    }
  }
}

module.exports = Subscription