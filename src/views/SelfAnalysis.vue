<template>
  <div class="SelfAnalysis">
    <div class="home__wrapper">
      <submit-form />
    </div>
  </div>
</template>

<script>
import SubmitForm from "../components/SubmitForm.vue"

export default {
  components: { SubmitForm },
  data() {
    return {
      tweets: [],
    }
  },
  methods: {
    postTweet() {},
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
