<template>
  <div class="SelfAnalysis">
    <div class="home__wrapper">
      <submit-form />
    </div>
    <div>
      <p v-for="tweet in tweets" :key="tweet.id">
        {{ tweet.text }}
      </p>
    </div>
  </div>
</template>

<script>
import SubmitForm from "../components/SubmitForm.vue"
import { collection, addDoc } from "firebase/firestore"
import { db } from "./firebase"

export default {
  data() {
    return {
      tweets: [],
    }
  },
  methods: {
    postTweet() {
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

<style scoped>
.home__wrapper {
  margin: 0 auto;
  max-width: 600px;
  background-color: #ccc;
}
</style>
