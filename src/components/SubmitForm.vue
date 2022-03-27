<template>
  <div class="form-wrapper">
    <textarea
      class="form__textarea"
      v-model="text"
      placeholder="幼少期～大学までの経験を共有しよう！"
    />

    <div class="form__buttons">
      <button v-on:click="postTweet" class="form__submit-button">投稿</button>
    </div>
    <div>
      <p v-for="tweet in tweets" :key="tweet.id">
        {{ tweet.text }}
      </p>
    </div>
  </div>
</template>

<script>
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limitToLast,
  onSnapshot,
} from "firebase/firestore"
import { db } from "@/firebase"

export default {
  data() {
    return {
      text: "",
      tweets: [],
      unsubscribe: null,
    }
  },
  methods: {
    postTweet() {
      addDoc(collection(db, "tweets"), {
        text: this.text,
        createdAt: serverTimestamp(),
      })
    },
  },
  created() {
    const ref = query(
      collection(db, "tweets"),
      orderBy("createdAt"),
      limitToLast(3)
    )

    this.unsubscribe = onSnapshot(ref, (snapshot) => {
      let tweets = []
      snapshot.forEach((doc) => {
        tweets.push(doc.data())
      })
      this.tweets = tweets
    })
  },

  unmounted() {
    this.unsubscribe()
    this.unsubscribe = null
  },
}
</script>

<style scoped>
.form__wrapper {
  padding: 1rem;
}
.form__textarea {
  width: 100%;
  height: calc(1.3rem * 3 + 0.5rem * 2);
  padding: 0.5rem;
  line-height: 1.3rem;
  border-radius: 5px;
  border: none;
  resize: none;
}
.form__textarea:focus {
  outline: none;
}
.form__buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
