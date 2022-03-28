<template>
  <div class="company-info">
    <div>
      <h2 class="top-title">企業詳細画面</h2>
      <div class="toggle-radio">
        <input
          @click="toEditable(1)"
          type="radio"
          name="rdo"
          id="yes"
          checked
        />
        <input @click="toEditable(2)" type="radio" name="rdo" id="no" />
        <div class="switch">
          <label class="toggle-label-left" for="yes">詳細中</label>
          <label class="toggle-label-right" for="no">編集中</label>
          <span></span>
        </div>
      </div>
    </div>
    <div class="company-info-basic company-info-list">
      <h5>基本情報</h5>
      <div class="company-info-block">
        <label>企業名：</label>
        <input
          type="text"
          placeholder="企業名"
          v-model="selectedCompany.name"
          :readonly="!isEditable"
        />
      </div>
      <div v-if="!isEditable" class="company-info-block" id="v-model-select">
        <label>業界：</label>
        <input
          type="text"
          placeholder="業界"
          v-model="selectedCompany.industry"
          :readonly="!isEditable"
        />
      </div>
      <div v-else id="v-model-select" class="company-info-block">
        <label>業界：</label>
        <select v-model="selectedCompany.industry">
          <option disabled value="">業界を選択してください</option>
          <option>証券・ネット証券業界</option>
          <option>生命保険業界</option>
          <option>損害保険業界</option>
          <option>クレジット業界</option>
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
        <input
          type="text"
          placeholder="マイページURL"
          v-model="selectedCompany.mypageURL"
          :readonly="!isEditable"
        />
      </div>
      <div class="company-info-block">
        <label>ログインID：</label>
        <input
          type="text"
          placeholder="ログインID"
          v-model="selectedCompany.logInId"
          :readonly="!isEditable"
        />
      </div>
      <div class="company-info-block">
        <label>パスワード：</label>
        <input
          type="text"
          placeholder="パスワード"
          v-model="selectedCompany.password"
          :readonly="!isEditable"
        />
      </div>
    </div>

    <div class="company-info-competitors company-info-list">
      <h5>競合他社</h5>
      <div v-if="isEditable">
        <input type="text" placeholder="競合他社名" v-model="competitor" />
        <button class="add-competitor-button addButton" @click="addCompetitor">
          追加
        </button>
      </div>
      <div
        v-for="competitor in selectedCompany.competitors"
        :key="competitor.id"
      >
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
          v-model="selectedCompany.gakuchika"
          :readonly="!isEditable"
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
          v-model="selectedCompany.aspiration"
          :readonly="!isEditable"
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
          v-model="selectedCompany.strengths"
          :readonly="!isEditable"
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
          v-model="selectedCompany.weakness"
          :readonly="!isEditable"
        ></textarea>
      </div>
    </div>

    <div class="company-info-memo company-info-list">
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
    <button
      v-if="isEditable"
      @click="deleteCom(id)"
      class="delete-button add-button"
    >
      {{ selectedCompany.name }}を削除
    </button>

    <button v-if="isEditable" @click="editFinish" class="end-finish-button">
      編集完了
    </button>
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
    toEditable(num) {
      switch (num) {
        case 1:
          this.isEditable = false
          break
        case 2:
          this.isEditable = true
          break
      }
    },
    addCompetitor() {
      if (this.competitor) {
        const competitor = {
          id: this.selectedCompany.competitors.length,
          name: this.competitor,
        }
        this.selectedCompany.competitors.push(competitor)
        this.competitor = ""
      }
    },
    editFinish() {
      this.isEditable = !this.isEditable
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
.top-title {
  margin-bottom: 70px;
}
.company-info-block {
  display: flex;
  justify-content: center;
}
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

.end-finish-button {
  display: inline-block;
  border-radius: 5%; /* 角丸       */
  text-align: center; /* 文字位置   */
  cursor: pointer; /* カーソル   */
  padding: 10px 10px; /* 余白       */
  background: #e96949; /* 背景色     */
  color: #ffffff; /* 文字色     */
  line-height: 1em; /* 1行の高さ  */
  transition: 0.3s; /* なめらか変化 */
  box-shadow: 4px 4px 3px #666666; /* 影の設定 */
  text-decoration: none;
  margin-top: 10px;
  margin-bottom: 30px;
  width: 150px;
  font-size: 20px;
}
.end-finish-button:hover {
  box-shadow: none;
  color: #e96949;
  background: #ffffff;
  border: 1px ridge #e96949;
}
.add-competitor-button {
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
  width: 70px;
  margin: 5px;
  font-size: 17px;
}
.add-competitor-button:hover {
  box-shadow: none;
  color: #82bcd9;
  background: #ffffff;
  border: 1px ridge #82bcd9;
}

.delete-button {
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
  margin-top: 10px;
  margin-bottom: 30px;
  margin-right: 10px;
  width: 150px;
  font-size: 20px;
}
.delete-button:hover {
  box-shadow: none;
  color: #82bcd9;
  background: #ffffff;
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
.toggle-radio {
  display: block;
}

.switch {
  position: absolute;
  top: 180px;
  left: 50%;
  width: 180px;
  height: 40px;
  text-align: center;
  margin: 0px 10px 0 0px;
  background: #59adc7;
  border-radius: 25px;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
}
.switch span {
  position: absolute;
  width: 20px;
  height: 4px;
  top: 50%;
  left: 50%;
  margin: -2px 0px 0px -4px;
  background: #fff;
  display: block;
  transform: rotate(-45deg);
  transition: all 0.2s ease;
}
.switch span:after {
  content: "";
  display: block;
  position: absolute;
  width: 4px;
  height: 12px;
  margin-top: -8px;
  background: #fff;
  transition: all 0.2s ease;
}
input[type="radio"] {
  display: none;
}
.switch label {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.2);
  width: 80px;
  line-height: 40px;
  transition: all 0.2s ease;
}
label[for="yes"] {
  position: absolute;
  left: 0px;
  height: 20px;
}
label[for="no"] {
  position: absolute;
  right: 0px;
}
#no:checked ~ .switch {
  background: #eb4f37;
}
#no:checked ~ .switch span {
  background: #fff;
  margin-left: -8px;
}
#no:checked ~ .switch span:after {
  background: #fff;
  height: 20px;
  margin-top: -8px;
  margin-left: 8px;
}
#yes:checked ~ .switch label[for="yes"] {
  color: #fff;
}
#no:checked ~ .switch label[for="no"] {
  color: #fff;
}
</style>
