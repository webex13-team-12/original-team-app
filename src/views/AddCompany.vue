<template>
  <div class="company-info">
    <h2>企業追加画面</h2>
    <div class="company-info-basic company-info-list">
      <h5>基本情報</h5>
      <div class="company-info-block">
        <label>企業名：</label>
        <input type="text" placeholder="企業名" v-model="name" />
      </div>
      <div class="company-info-block demo" id="v-model-select">
        <label>業界：</label>
        <select v-model="industry">
          <option disabled value="">業界を選択してください</option>
          <option>証券・ネット証券業界</option>
          <option>生命保険業界</option>
          <option>損害保険業界</option>
          <option>クレジット業界界</option>
          <option>リース業界</option>
          <option>通信サービス業界</option>
          <option>ソフトウェア業界</option>
          <option>インターネットサービス業界</option>
          <option>ネット広告・広告業界</option>
          <option>テレビ業界</option>
          <option>出版業界</option>
          <option>新聞業界</option>
          <option>建設業界</option>
          <option>不動産業界</option>
          <option>住宅業界</option>
          <option>航空業界</option>
          <option>鉄道業界</option>
          <option>海運業界</option>
          <option>電力業界</option>
          <option>化学業界</option>
          <option>鉄鋼業界</option>
          <option>自動車業界</option>
          <option>機械業界</option>
          <option>電気機器業界</option>
          <option>電子部品業界</option>
          <option>食品業界</option>
          <option>総合商社業界</option>
          <option>専門商社業界</option>
          <option>百貨店業界</option>
          <option>医薬品業界</option>
          <option>化粧品業界</option>
          <option>アパレル業界</option>
          <option>人材業界</option>
          <option>教育業界</option>
          <option>コンサルティング業界</option>
          <option>旅行業界</option>
          <option>ゲーム・玩具業界</option>
          <option>映像・音楽業界</option>
        </select>
      </div>
    </div>

    <div class="company-info-homepage company-info-list">
      <h5>採用ページ</h5>
      <div class="company-info-block">
        <label>マイページURL：</label>
        <input type="text" placeholder="マイページURL" v-model="mypageURL" />
      </div>
      <div class="company-info-block">
        <label>ログインID：</label>
        <input type="text" placeholder="ログインID" v-model="logInId" />
      </div>
      <div class="company-info-block">
        <label>パスワード：</label>
        <input type="text" placeholder="パスワード" v-model="password" />
      </div>
    </div>

    <div class="company-info-competitors company-info-list">
      <h5>競合他社</h5>
      <div class="company-info-block">
        <input type="text" placeholder="競合他社名" v-model="competitor" />
        <button class="addButton add-competitor-button" @click="addCompetitor">
          追加
        </button>
      </div>
      <div v-for="competitor in competitors" :key="competitor.id">
        {{ competitor.id + 1 }}社目:{{ competitor.name }}
      </div>
    </div>

    <div class="company-info-gakuchika company-info-list">
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

    <div class="company-info-aspiration company-info-list">
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

    <div class="company-info-strengths company-info-list">
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

    <div class="company-info-weakness company-info-list">
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

    <div class="company-info-memo company-info-list">
      <h5>メモ</h5>
      <div class="company-info-block">
        <textarea name="" id="" cols="100" rows="5" v-model="memo"></textarea>
      </div>
    </div>

    <div>
      <button class="addButton add-company-button" @click="addCompany">
        企業追加
      </button>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
// firebase.js で db として export したものを import
import { db } from "@/firebase"
export default {
  components: {},
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
      memo: "",
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
  },
  methods: {
    addCompetitor() {
      if (this.competitor) {
        const competitor = {
          id: this.competitors.length,
          name: this.competitor,
        }
        this.competitors.push(competitor)
        this.competitor = ""
      }
    },
    addCompany() {
      if (!this.user) {
        alert("ログインユーザーがいません")
      } else if (!this.name) {
        alert("企業名が未設定です")
      } else {
        addDoc(collection(db, "company"), {
          user: this.user.uid,
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
          memo: this.memo,
          createdAt: serverTimestamp(),
        })
        alert("上記の企業を追加します")
        this.$router.push("/")
      }
    },
  },
}
</script>

<style scoped>
.company-info {
  width: 70%;
  padding: 3% 5% 5% 5%;
  margin-left: auto;
  margin-right: auto;
  background: #ffffff;
  box-shadow: 4px 4px 3px #666666;
}
.company-info-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3px;
}
.company-info-list {
  background: #ffe2db;
  width: 70%;
  margin: 10px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  border-radius: 20px;
}

.addButton {
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
  text-decoration: none;
}
.add-company-button {
  margin-top: 10px;
  margin-bottom: 30px;
  width: 150px;
  font-size: 20px;
}
.add-competitor-button {
  width: 70px;
  margin: 5px;
  font-size: 17px;
}
.addButton:hover {
  box-shadow: none; /* カーソル時の影消去 */
  color: #82bcd9; /* 背景色     */
  background: #ffffff; /* 文字色     */
  border: 1px ridge #82bcd9;
}
h5 {
  font-weight: bold;
  font-size: large;
}
label {
  font-size: 1em;
  font-weight: bold;
}
input,
textarea {
  width: 70%;
  height: 40%;
  border: 0;
  border-radius: 5px;
  outline: none;
  padding: 0.5em 1em 0.5em 1em;
  font-size: 10;
}

select {
  display: block;
  height: 30px;
  width: 70%;
  border: 0;
  border-radius: 5px;
}
select:invalid {
  color: #b9b0b0;
}
</style>
