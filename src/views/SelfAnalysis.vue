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
  background-color: #ffffe0;
  border-radius: 5%;
}

.SelfAnalysis {
  width: 80%;
  padding: 3% 5% 5% 5%;
  margin-left: auto;
  margin-right: auto;
  background: #ffffff;
  box-shadow: 4px 4px 3px #666666;
}
</style>
