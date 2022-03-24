<template>
  <h1>自己分析</h1>
  <h2>幼少期～大学までの経験を投稿し、フィードバックしましょう！</h2>
  <div class="home__wrapper">
    <div class="form__wrapper">
      <textarea
        class="form__textarea"
        v-model="text"
        placeholder="幼少期～大学までの経験を語ろう！"
      />
      <div class="form__buttons">
        <button v-on:click="postTweet" class="form__submit-button">投稿</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    }
  },
  methods: {
    postTweet() {
      alert("投稿機能の完成をお楽しみに！")
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
