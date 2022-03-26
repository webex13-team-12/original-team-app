<template>
  <div class="home">
    <div v-if="user" class="userInfo">
      <div>ユーザー情報</div>
      <div>メアド：{{ user.email }}</div>
      <div>表示名：{{ user.displayName }}</div>
      <router-link to="/addcompany" class="addButton">企業追加</router-link>
    </div>

    <div class="company-list">
      <div
        v-for="industrial in industrial_companies"
        :key="industrial.industrial"
      >
        <div>
          <div>{{ industrial.industry }}</div>
          <div
            class="company-card"
            v-for="company in industrial.companies"
            :key="company.id"
            @click="showDetail(company)"
          >
            <div>企業名：{{ company.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
export default {
  components: {},
  data() {
    return {
      user: null,
      companies: [],
      unsubscribe: null,
      industrial_companies: [],
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

      this.unsubscribe = onSnapshot(q, (snapshot) => {
        let companies = []
        snapshot.forEach((doc) => {
          companies.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        let industry = []
        companies.forEach((value) => {
          if (!industry.includes(value.industry)) {
            industry.push(value.industry)
          }
        })
        this.industrial_companies = []
        for (let i = 0; i < industry.length; i++) {
          let this_industry_company = []
          companies.forEach((value) => {
            if (industry[i] == value.industry) {
              this_industry_company.push(value)
            }
          })
          this.industrial_companies.push({
            industry: industry[i],
            companies: this_industry_company,
          })
        }
      })
    } else {
      alert("ログインしてください")
    }
  },
  computed() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    this.unsubscribe()
    this.unsubscribe = null
  },
}
</script>

<style scoped>
.home {
}
.addButton,
.company-card {
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
.addButton:hover,
.company-card:hover {
  box-shadow: none; /* カーソル時の影消去 */
  color: #82bcd9; /* 背景色     */
  background: #ffffff; /* 文字色     */
}
.company-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.company-card {
  width: 100%;
}
.userInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 20px;
}
</style>
