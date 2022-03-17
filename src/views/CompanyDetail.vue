<template>
  <div class="company-info">
    <h2>企業詳細画面</h2>
    <div class="company-info-basic">
      <h5>基本情報</h5>
      <div class="company-info-block">
        <p>企業名</p>
        <input
          type="text"
          placeholder="企業名"
          v-model="selectedCompany.name"
        />
      </div>
      <div class="company-info-block">
        <p>業界</p>
        <input
          type="text"
          placeholder="業界"
          v-model="selectedCompany.industry"
        />
      </div>
    </div>

    <div class="company-info-homepage">
      <h5>採用ページ</h5>
      <div class="company-info-block">
        <p>マイページURL</p>
        <input
          type="text"
          placeholder="マイページURL"
          v-model="selectedCompany.mypageURL"
        />
      </div>
      <div class="company-info-block">
        <p>ログインID</p>
        <input
          type="text"
          placeholder="ログインID"
          v-model="selectedCompany.logInId"
        />
      </div>
      <div class="company-info-block">
        <p>パスワード</p>
        <input
          type="text"
          placeholder="パスワード"
          v-model="selectedCompany.password"
        />
      </div>
    </div>

    <div class="company-info-competitors">
      <h5>競合他社</h5>
      <div
        v-for="competitor in selectedCompany.competitors"
        :key="competitor.id"
      >
        {{ competitor.id + 1 }}社目:{{ competitor.name }}
      </div>
    </div>

    <div class="company-info-gakuchika">
      <h5>ガクチカ</h5>
      <div class="company-info-block">
        <textarea
          name=""
          id=""
          cols="100"
          rows="5"
          v-model="selectedCompany.gakuchika"
        ></textarea>
      </div>
    </div>

    <div class="company-info-aspiration">
      <h5>志望理由</h5>
      <div class="company-info-block">
        <textarea
          name=""
          id=""
          cols="100"
          rows="5"
          v-model="selectedCompany.aspiration"
        ></textarea>
      </div>
    </div>

    <div class="company-info-strengths">
      <h5>強み</h5>
      <div class="company-info-block">
        <textarea
          name=""
          id=""
          cols="100"
          rows="5"
          v-model="selectedCompany.strengths"
        ></textarea>
      </div>
    </div>

    <div class="company-info-weakness">
      <h5>弱み</h5>
      <div class="company-info-block">
        <textarea
          name=""
          id=""
          cols="100"
          rows="5"
          v-model="selectedCompany.weakness"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebase"
// firebase.js で db として export したものを import
export default {
  components: {},
  data() {
    return {
      selectedCompany: null,
      user: null,
    }
  },
  created() {
    const auth = getAuth()
    const user = auth.currentUser
    this.name = this.$route.params.name.toString()
    const q = query(collection(db, "company"), where("name", "==", this.name))
    getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        this.selectedCompany = doc.data()
      })
    })

    this.user = user
  },
}
</script>

<style scoped>
.company-info-block {
  display: flex;
  justify-content: center;
}
</style>
