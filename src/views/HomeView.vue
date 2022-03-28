<template>
  <div class="home">
    <div v-if="user" class="userInfo">
      <div>ユーザー情報</div>
      <div>メアド：{{ user.email }}</div>
      <div>表示名：{{ user.displayName }}</div>
      <router-link to="/addcompany" class="addButton">企業追加</router-link>
    </div>
    <div class="company-background">
      <h2 class="top-title">企業一覧</h2>
      <div v-if="industrial_companies.length === 0">企業を追加しましょう</div>
      <div
        class="company-list"
        v-for="industrial in industrial_companies"
        :key="industrial.industrial"
      >
        <div class="company-industry">{{ industrial.industry }}</div>
        <div
          class="company-card"
          v-for="company in industrial.companies"
          :key="company.id"
          @click="showDetail(company)"
        >
          <div>
            <div class="company-name">企業名：{{ company.name }}</div>
            <div class="company-memo">
              <span class="memo">メモ:</span> {{ company.memo }}
            </div>
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
      this.$router.push("/signin")
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
* {
  padding: 0;
  margin: 0;
}
.home {
  width: 100%;
  margin-bottom: 40px;
  position: relative;
}

.company-name {
  font-size: 20px;
  font-weight: bold;
  margin: 10px;
}
.addButton {
  margin-top: 10px;
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
  margin-right: 20px;
  width: 150px;
  font-size: 20px;
  text-decoration: none;
}
.addButton:hover,
.company-card:hover {
  box-shadow: none; /* カーソル時の影消去 */
  color: #e96949; /* 背景色     */
  background: #ffffff; /* 文字色     */
  border: 1px ridge #e96949;
}
.company-background {
  width: 50%;
  padding: 3% 5% 5% 5%;
  margin-left: auto;
  margin-right: auto;
  background: #ffffff;
  box-shadow: 4px 4px 3px #666666;
}
.company-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.company-industry {
  font-weight: bold;
  margin-top: 20px;
  text-align: left;
  padding-left: 30px;
  font-size: 24px;
  /* text-shadow: 1px 1px 0 #fff, 2px 2px 0 #82bcd9; */
}
.fuchidori {
  text-shadow: 1px 1px 0 #82bcd9, -1px -1px 0 #82bcd9, -1px 1px 0 #82bcd9,
    1px -1px 0 #82bcd9, 0px 1px 0 #82bcd9, 0-1px 0 #82bcd9, -1px 0 0 #82bcd9,
    1px 0 0 #82bcd9;
}
.company-card {
  margin-top: 10px;
  display: inline-block;
  border-radius: 10px; /* 角丸       */
  text-align: center; /* 文字位置   */
  cursor: pointer; /* カーソル   */
  padding: 10px 10px; /* 余白       */
  line-height: 1em; /* 1行の高さ  */
  box-shadow: 4px 4px 3px #666666; /* 影の設定 */
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  background: #ffe2db;
  color: #565656;
}
.memo {
  font-weight: bold;
}
.userInfo {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 20px;
  position: absolute;
  right: 0px;
}
</style>
