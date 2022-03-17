<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/signin">ログイン</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentUser: null,
    }
  },
  methods: {
    updateUser(user) {
      this.currentUser = user
      console.log(this.currentUser)
    },
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  provide() {
    return {
      currentUser: this.currentUser,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
