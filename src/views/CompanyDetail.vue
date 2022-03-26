<template>
  <div class="company-info">
    <div>
      <h2>企業詳細画面</h2>
      <button @click="toEditable">編集モード</button>
      <button @click="deleteCom(id)">{{ selectedCompany.name }}を削除</button>
    </div>
    <div class="company-info-basic">
      <h5>基本情報</h5>
      <div class="company-info-block">
        <p>企業名</p>
        <input
          type="text"
          placeholder="企業名"
          v-model="selectedCompany.name"
          :readonly="!isEditable"
        />
      </div>
      <div class="company-info-block">
        <div v-if="!isEditable">
          <span>業界</span>
          <input
            type="text"
            placeholder="業界"
            v-model="selectedCompany.industry"
            :readonly="!isEditable"
          />
        </div>
        <div v-else id="v-model-select" class="company-info-block">
          <p>業界：</p>
          <select v-model="selectedCompany.industry">
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
    </div>

    <div class="company-info-homepage">
      <h5>採用ページ</h5>
      <div class="company-info-block">
        <p>マイページURL</p>
        <input
          type="text"
          placeholder="マイページURL"
          v-model="selectedCompany.mypageURL"
          :readonly="!isEditable"
        />
      </div>
      <div class="company-info-block">
        <p>ログインID</p>
        <input
          type="text"
          placeholder="ログインID"
          v-model="selectedCompany.logInId"
          :readonly="!isEditable"
        />
      </div>
      <div class="company-info-block">
        <p>パスワード</p>
        <input
          type="text"
          placeholder="パスワード"
          v-model="selectedCompany.password"
          :readonly="!isEditable"
        />
      </div>
    </div>

    <div class="company-info-competitors">
      <h5>競合他社</h5>
      <div v-if="isEditable">
        <input type="text" placeholder="競合他社名" v-model="competitor" />
        <button @click="addCompetitor">追加</button>
      </div>
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
          :readonly="!isEditable"
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
          :readonly="!isEditable"
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
          :readonly="!isEditable"
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
          :readonly="!isEditable"
        ></textarea>
      </div>
    </div>

    <div class="company-info-memo">
      <h5>メモ</h5>
      <div class="company-info-block">
        <textarea
          name=""
          id=""
          cols="100"
          rows="5"
          v-model="selectedCompany.memo"
          :readonly="!isEditable"
        ></textarea>
      </div>
    </div>
  </div>
  <div>
    <button v-if="isEditable" @click="editFinish">編集完了</button>
  </div>
</template>

<script>
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "../firebase"
// firebase.js で db として export したものを import
export default {
  components: {},
  data() {
    return {
      selectedCompany: null,
      user: null,
      isEditable: false,
      competitor: "",
      id: "",
    }
  },
  methods: {
    toEditable() {
      this.isEditable = !this.isEditable
      console.log(this.isEditable)
    },
    addCompetitor() {
      const competitor = {
        id: this.selectedCompany.competitors.length,
        name: this.competitor,
      }
      this.selectedCompany.competitors.push(competitor)
      this.competitor = ""
    },
    editFinish() {
      this.isEditable = !this.isEditable
      console.log(this.id)
      const companyRef = doc(db, "company", this.id)
      setDoc(companyRef, {
        user: this.selectedCompany.user,
        name: this.selectedCompany.name,
        industry: this.selectedCompany.industry,
        logInId: this.selectedCompany.logInId,
        password: this.selectedCompany.password,
        mypageURL: this.selectedCompany.mypageURL,
        competitors: this.selectedCompany.competitors,
        gakuchika: this.selectedCompany.gakuchika,
        aspiration: this.selectedCompany.aspiration,
        strengths: this.selectedCompany.strengths,
        weakness: this.selectedCompany.weakness,
        memo: this.selectedCompany.memo,
        updatedAt: serverTimestamp(),
      })
    },
    deleteCom(id) {
      const companyRef = doc(db, "company", id)
      if (
        confirm(
          this.selectedCompany.name + "の企業情報を削除してよろしいですか？"
        )
      ) {
        deleteDoc(companyRef)
        this.$router.push("/")
      } else {
        console.log("キャンセルボタンが押されました。")
      }
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    if (this.$route.params.id) {
      localStorage.setItem(
        "selectedCompanyId",
        JSON.stringify(this.$route.params.id)
      )
    }
    this.id = JSON.parse(localStorage.getItem("selectedCompanyId"))

    const companyRef = doc(db, "company", this.id)
    getDoc(companyRef).then((docSnap) => {
      if (docSnap.exists()) {
        this.selectedCompany = docSnap.data()
      } else {
        alert("No such document!")
      }
    })
  },
}
</script>

<style scoped>
.company-info-block {
  display: flex;
  justify-content: center;
}
</style>
