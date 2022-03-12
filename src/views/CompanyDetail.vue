<template>
  <div class="company-info">
    <h2>企業詳細画面</h2>
    <div class="company-info-basic">
      <h5>基本情報</h5>
      <div class="company-info-block">
        <p>企業名</p>
        <input type="text" placeholder="企業名" v-model="name" />
      </div>
      <div class="company-info-block">
        <p>業界</p>
        <input type="text" placeholder="業界" v-model="industry" />
      </div>
    </div>

    <div class="company-info-homepage">
      <h5>採用ページ</h5>
      <div class="company-info-block">
        <p>マイページURL</p>
        <input type="text" placeholder="マイページURL" v-model="mypageURL" />
      </div>
      <div class="company-info-block">
        <p>ログインID</p>
        <input type="text" placeholder="ログインID" v-model="logInId" />
      </div>
      <div class="company-info-block">
        <p>パスワード</p>
        <input type="text" placeholder="パスワード" v-model="password" />
      </div>
    </div>

    <div class="company-info-competitors">
      <h5>競合他社</h5>
      <div class="company-info-block">
        <input type="text" placeholder="競合他社名" v-model="competitor" />
        <button @click="addCompetitor">追加</button>
      </div>
      <div v-for="competitor in competitors" :key="competitor.id">
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
          v-model="gakuchika"
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
          v-model="aspiration"
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
          v-model="strengths"
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
          v-model="weakness"
        ></textarea>
      </div>
    </div>

    <div>
      <button @click="addCompany">企業追加</button>
    </div>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// firebase.js で db として export したものを import
import { db } from "@/firebase"
export default {
  components: {},
  props: ["selectedCompany"],
  data() {
    return {
      user: null,
      name: "",
      industry: "",
      logInId: "",
      password: "",
      mypageURL: "",
      competitor: "",
      competitors: [],
      gakuchika: "",
      aspiration: "",
      strengths: "",
      weakness: "",
    }
  },
  created() {
    const auth = getAuth()
    const user = auth.currentUser
    this.user = user
  },
  methods: {
    addCompetitor() {
      const competitor = { id: this.competitors.length, name: this.competitor }
      this.competitors.push(competitor)
      this.competitor = ""
    },
    addCompany() {
      console.log(this.user)
      // if (this.user) {
      addDoc(collection(db, "company"), {
        // user: this.user,
        name: this.name,
        industry: this.industry,
        logInId: this.logInId,
        password: this.password,
        mypageURL: this.mypageURL,
        competitors: this.competitors,
        gakuchika: this.gakuchika,
        aspiration: this.aspiration,
        strengths: this.strengths,
        weakness: this.weakness,
      })
      alert("上記の企業を追加します")
      // } else {
      //   alert("ログインユーザーがいません")
      // }
    },
  },
}
</script>

<style scoped>
.company-info-block {
  display: flex;
  justify-content: center;
}
</style>
