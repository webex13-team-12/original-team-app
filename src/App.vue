<template>
  <div>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/self-analysis">自己分析</router-link>
    </div>
    <router-view />
  </div>

  <div class="app">
    <button v-on:click="postTweet">ツイート</button>
    <!-- 変更点１ -->
    <div>
      <p v-for="tweet in tweets" :key="tweet.id">
        {{ tweet.text }}
      </p>
    </div>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore"
import { db } from "./firebase"

export default {
  data() {
    return {
      /* 変更点２ */
      tweets: [
        // {
        //   id: "0GwoGZuhTNhqHQDBeiVW",
        //   text: "こんにちは、ツイートの本文です。"
        // }
      ],
    }
  },
  methods: {
    postTweet() {
      /* 変更点１ */
      const tweet = {
        text: "こんにちは、ツイートの本文です。",
      }
      addDoc(collection(db, "tweets"), tweet).then((ref) => {
        this.tweets.push({
          id: ref.id,
          ...tweet,
        })
      })
    },
  },
}
</script>
