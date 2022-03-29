<template>
 SelfAnalysis_fixed
  
     
    
  <!-- <header>
    <div></div>
    <nav class="header_content">
      <router-link to="/" class="header_home">Home</router-link> |
      <router-link to="/about" class="header_company">企業リスト</router-link>
      <router-link to="/self-analysis" class="header_bunseki">自己分析</router-link>
      <router-link to="/mypage" class="header_mypage">マイページ</router-link>
      <router-link to="/login" class="header_login">ログイン</router-link>
    </nav>
    <router-view />
  </header> -->

  <div class="nav__bar">
    <!-- <nav> -->
    <!-- <router-link
        v-if="currentUser !== null"
        to="/"
        class="nav__logo nav__link"
        >企業リスト</router-link
      > -->
    <router-link to="/" class="nav__logo nav__link">ジョブマネ</router-link>

    <div class="nav__items">
      <router-link to="/" class="nav__item nav__link">企業リスト</router-link>
      <router-link
        to="/about"
        class="nav__item nav__link"
        v-bind:val="currentUser"
        >自己分析</router-link
      >
      <!-- <router-link
          v-if="currentUser === null"
          to="/signin"
          class="nav__item nav__link"
          >マイページ</router-link
        > -->
      <router-link to="/mypage" class="nav__item nav__link"
        >マイページ</router-link
      >
      <router-link to="/signin" class="nav__item nav__link"
        >ログイン(about)</router-link
      >
    </div>
    <!-- </nav> -->
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      currentUser: null,
    }
  },
  methods: {},
  computed() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
  },
}
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
  background: #eeeff1;
  padding-bottom: 30px;
}
.nav__bar {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: #59adc7;
  /* margin-bottom: 20px; */
  padding: 5px;
}
.nav__link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #fdfffe;
  text-decoration: none;
  font-size: larger;
  font-weight: bold;

  text-decoration: none;
}

.nav a.router-link-exact-active {
  color: #fdfffe;
}
.nav__link:visited {
  color: #eee;
}
.nav__link:hover {
  font-weight: bold;
  color: #fff;
}
.nav__logo {
  width: 130px;
}
.nav__items {
  display: flex;
}
.nav__item {
  width: 100px;
  border-left: 1px solid #eee;
}
* {
  padding: 0;

  margin: 0;
}
.router-link {
  text-decoration: none;
}
</style>
 master
