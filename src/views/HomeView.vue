<template>
  <div class="home">
    <div v-if="user" class="userInfo">
      <div>ユーザー情報</div>
      <div>メアド：{{ user.email }}</div>
      <div>表示名：{{ user.displayName }}</div>
      <router-link to="/addcompany" class="addButton">企業追加</router-link>
    </div>

    <div class="company-list">
      <div class="company-card" v-for="company in companies" :key="company.id">
        <btn @click="showDetail(company)">企業名：{{ company.name }}</btn>
        <div>業界：{{ company.industry }}</div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"
export default {
  components: {},
  data() {
    return {
      user: null,
      companies: [],
    }
  },
  methods: {
    showDetail(company) {
      this.$router.push({
        name: "companyDetail",
        params: {
          id: company.id,
        },
      })
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    if (this.user) {
      const q = query(
        collection(db, "company"),
        where("user", "==", this.user.uid)
      )
      getDocs(q).then((snapshot) => {
        snapshot.forEach((doc) => {
          this.companies.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
    } else {
      alert("ログインしてください")
    }
  },
  computed() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
  },
}
</script>

<style scoped>
.home {
}
.addButton {
  margin-top: 10px;
  display: inline-block;
  border-radius: 5%; /* 角丸       */
  font-size: 14pt; /* 文字サイズ */
  text-align: center; /* 文字位置   */
  cursor: pointer; /* カーソル   */
  padding: 10px 10px; /* 余白       */
  background: #82bcd9; /* 背景色     */
  color: #ffffff; /* 文字色     */
  line-height: 1em; /* 1行の高さ  */
  transition: 0.3s; /* なめらか変化 */
  box-shadow: 4px 4px 3px #666666; /* 影の設定 */
  border: 2px solid #000066; /* 枠の指定 */
}
.addButton:hover {
  box-shadow: none; /* カーソル時の影消去 */
  color: #82bcd9; /* 背景色     */
  background: #ffffff; /* 文字色     */
}
.company-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.company-card {
  /* margin: 10px 40px; */
  width: 40%;
  border: 4px solid;
  border-radius: 20px;
}
.userInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 20px;
}
</style>
