<template>
  <h2>自己分析</h2>
  <h5>過去体験</h5>
  <div class="form-wrapper">
    <textarea
      class="form__textarea"
      v-model="text"
      placeholder="幼少期～大学までの経験を共有しよう！"
    />

    <div class="list-container">
      <div id="v-model-select" class="demo">
        <p>モチベーション</p>
        <select v-model="persentage">
          <option disabled value="">0</option>
          <option>0</option>
          <option>10</option>
          <option>20</option>
          <option>30</option>
          <option>40</option>
          <option>50</option>
          <option>60</option>
          <option>70</option>
          <option>80</option>
          <option>90</option>
          <option>100</option>
        </select>
        <p>%</p>
      </div>

      <div class="form__buttons">
        <button v-on:click="postTweet" class="form__submit-button">投稿</button>
      </div>
    </div>
  </div>
  <h5>投稿・コメント欄</h5>
  <div class="reply-container">
    <p v-for="tweet in tweets" :key="tweet.id">
      {{ tweet.text }}
    </p>
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
      persentage: "",
    }
  },
  methods: {
    postTweet() {
      addDoc(collection(db, "tweets"), {
        text: this.text,
        persentage: this.persentage,
        createdAt: serverTimestamp(),
      })
    },
  },
  created() {
    const ref = query(
      collection(db, "tweets"),
      orderBy("createdAt"),
      limitToLast(15)
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
.form__textarea {
  width: 80%;
  height: calc(1.3rem * 3 + 0.5rem * 2);
  padding: 0.5rem;
  line-height: 1.3rem;
  border-radius: 5px;
  border: none;
  resize: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px;
  font-size: 10;
  margin: 0 auto;
}
.form__submit-button {
  display: inline-block;
  border-radius: 5%; /* 角丸       */
  text-align: center; /* 文字位置   */
  cursor: pointer; /* カーソル   */
  padding: 10px 10px; /* 余白       */
  background: #82bcd9; /* 背景色     */
  color: #ffffff; /* 文字色     */
  line-height: 1em; /* 1行の高さ  */
  transition: 0.3s; /* なめらか変化 */
  box-shadow: 4px 4px 3px #666666; /* 影の設定 */
  text-decoration: none;
  margin-top: 10px;
  margin-bottom: 30px;
  width: 150px;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 30px;
  width: 150px;
  font-size: 20px;
}

.form__submit-button:hover {
  box-shadow: none; /* カーソル時の影消去 */
  color: #82bcd9; /* 背景色     */
  background: #ffffff; /* 文字色     */
  border: 1px ridge #82bcd9;
}
.demo {
  font-family: sans-serif;
  border-radius: 5%;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
  display: flex;
}

.list-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  font-weight: bold;
  font-size: 40px;

  text-align: center;
}

h5 {
  font-weight: bold;
  font-size: large;
  text-align: center;
}

.reply-container {
  margin: 3px;
  font-size: 10;

  background: #ffffff;
}
</style>
