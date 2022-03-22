diff --git a/src/App.vue b/src/App.vue index ca84756..e7a00be 100644
b/src/App.vue

<template>
  <header>
    <div></div>
    <nav class="header_content">
      <router-link to="/" class="header_home">Home</router-link> |
      <router-link to="/about" class="header_company">企業リスト</router-link>
      <router-link to="/bunseki" class="header_bunseki">自己分析</router-link>
      <router-link to="/mypage" class="header_mypage">マイページ</router-link>
      <router-link to="/login" class="header_login">ログイン</router-link>
    </nav>
    <router-view />
  </header>

  <!-- <div id="app">
    <upload v-model="picture" />
    <img :src="picture" />
  </div> -->
</template>

<script>
// import UpLoad from "./components/MyPageView.vue"

// export default {
//   name: `app`,
//   comments: {
//     UpLoad,
//   },
//   data() {
//     return {
//       picture: null,
//     }
//   },
// }
</script>

<style>
.header_content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(113, 190, 220, 1);
}

.header_home {
  font-size: 17px;

  margin-left: 29px;
  transition: header_home 0.2s;
}
.header_home:hover {
  transform: scale(1.3 1.3);
}
.header_company {
  font-size: 15px;
  color: #2f4846;
  margin-left: 29px;
}
.header_mypage {
  font-size: 15px;
  color: black;
  margin-left: 29px;
  /* box-shadow: 0 0 15px rgb(0 0 0 / 15%); */
}
.header_bunseki {
  font-size: 15px;
  margin-left: 29px;
}
.header_login {
  font-size: 15px;
  color: rgba(113, 190, 220, 1);
  margin-left: 29px;
  box-shadow: 0 0 15px rgb(0 0 0 / 15%);
  background-color: #fdfffe;
  border-radius: 20px;
  padding: 7px;
  width: 80px;
}
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
  color: #fdfffe;
}
</style>
