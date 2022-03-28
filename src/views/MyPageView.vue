<template>
  <div class="top_profile">
    <div class="my_profile">
      <div class="top_profile">
        <!-- <div class="icon"></div> -->

        <input
          type="file"
          accept="image/jpeg,image/png,image/gif"
          @change="uploadFile"
        />
        <div>名前が入る</div>
      </div>

      <div class="my_profile_goal">
        目標<br />

        <textarea
          class="input_textform_goal"
          name=""
          id=""
          v-model="profile.goal"
          type="text"
          placeholder="就活の目標"
        >
        >
          ></textarea
        >
      </div>
    </div>
    <div class="keireki_profile">
      <div>資格</div>
      <textarea
        class="input_textform"
        v-model="profile.sikaku"
        placeholder="取得資格を入力"
      ></textarea>
      <div>入学卒業</div>
      <div class="j_school">
        <div class="keireki_yohaku">中学</div>
        <textarea
          class="input_textform_school"
          v-model="profile.juniorhighschool_name"
          placeholder="中学校名を入力してください"
        ></textarea>
        <p>
          <select name="example1" v-model="profile.juniorhighschool_year">
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
          </select>
        </p>
        <div class="keireki_yohaku">年</div>

        <p>
          <select name="example2" v-model="profile.juniorhighschool_state">
            <option value="卒業">卒業</option>
            <option value="入学">入学</option>
            <option value="留学">留学</option>
            <option value="留年">留年</option>
          </select>
        </p>
      </div>
      <div class="h_school">
        <div class="keireki_yohaku">高校</div>
        <textarea
          class="input_textform_school"
          v-model="profile.highschool_name"
          placeholder="高校名を入力してください"
        ></textarea>
        <p>
          <select name="example1" v-model="profile.highschool_year">
            <option value="2013">2015</option>
            <option value="2014">2016</option>
            <option value="2015">2017</option>
            <option value="2016">2018</option>
          </select>
        </p>
        <div class="keireki_yohaku">年</div>

        <p>
          <select name="example2" v-model="profile.highschool_state">
            <option value="卒業">卒業</option>
            <option value="入学">入学</option>
            <option value="留学">留学</option>
            <option value="留年">留年</option>
          </select>
        </p>
        <!-- <p><input type="submit" value="決定" /></p> -->
      </div>
      <div class="c_school">
        <div class="keireki_yohaku">大学</div>
        <textarea
          class="input_textform_school"
          v-model="profile.colleageschool_name"
          placeholder="大学名を入力してください"
        ></textarea>
        <p>
          <select name="example1" v-model="profile.colleageschool_year">
            <option value="2013">2016</option>
            <option value="2014">2017</option>
            <option value="2016">2018</option>
            <option value="2015">2019</option>
            <option value="2013">2020</option>
            <option value="2014">2021</option>
            <option value="2016">2022</option>
            <option value="2015">2023</option>
          </select>
        </p>
        <div class="keireki_yohaku">年</div>

        <p>
          <select name="example2" v-model="profile.colleageschool_state">
            <option value="卒業">卒業</option>
            <option value="入学">入学</option>
            <option value="留学">留学</option>
            <option value="留年">留年</option>
          </select>
        </p>
      </div>
    </div>
  </div>
  <!--5行目題名と入力がセットのdiv -->
  <div class="profils">
    <div class="own_profils">
      <div class="daimei">自己PR</div>
      <textarea
        class="input_textform_text"
        v-model="profile.owntext"
        placeholder="自己PR"
        id="app"
      ></textarea>
    </div>
    <div class="gakutika_profils">
      <div class="daimei">ガクチカ</div>
      <textarea
        class="input_textform_text"
        v-model="profile.gakutikatext"
        placeholder="学生時代に頑張ったことを入力してみよう"
        id="app"
      ></textarea>
    </div>
    <div class="gyokai_profils">
      <div class="daimei">業界志望理由</div>
      <textarea
        class="input_textform_text"
        v-model="profile.gyokaitext"
        placeholder="その業界を志望している理由"
        id="app"
      ></textarea>
    </div>
    <div class="other_profils">
      <div class="daimei">その他</div>
      <textarea
        class="input_textform_text"
        v-model="profile.othertext"
        placeholder="自由記入欄"
        id="app"
      ></textarea>
    </div>
  </div>
  <button v-on:click="addProfile" class="edit edit-button">
    内容を更新する
  </button>
</template>

<script>
import {
  collection,
  serverTimestamp,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore"
// firebase.js で db として export したものを import
import { db } from "@/firebase"

export default {
  data() {
    return {
      profileId: "",
      file: null,
      user: null /*ここ追加 */,
      profile: {
        goal: "",
        uid: "" /*ここ追加 uid=userID */,
        sikaku: "",
        juniorhighschool_name: "",
        highschool_name: "",
        colleageschool_name: "",
        juniorhighschool_year: "",
        highschool_year: "",
        colleageschool_year: "",
        juniorhighschool_state: "",
        highschool_state: "",
        colleageschool_state: "",
        owntext: "",
        gakutikatext: "",
        gyokaitext: "",
        othertext: "",
      },
    }
  },
  methods: {
    addProfile() {
      if (!this.user) {
        alert("ログインユーザーがいません")
      } else {
        setDoc(doc(db, "profile", this.user.uid), {
          uid: this.user.uid,
          goal: this.profile.goal,
          sikaku: this.profile.sikaku,
          juniorhighschool_name: this.profile.juniorhighschool_name,
          highschool_name: this.profile.highschool_name,
          colleageschool_name: this.profile.colleageschool_name,
          juniorhighschool_year: this.profile.juniorhighschool_year,
          highschool_year: this.profile.highschool_year,
          colleageschool_year: this.profile.colleageschool_year,
          juniorhighschool_state: this.profile.juniorhighschool_state,
          highschool_state: this.profile.highschool_state,
          colleageschool_state: this.profile.colleageschool_state,
          owntext: this.profile.owntext,
          gakutikatext: this.profile.gakutikatext,
          gyokaitext: this.profile.gyokaitext,
          othertext: this.profile.othertext,
          updatedAt: serverTimestamp(),
        })
        alert("更新完了")
      }
    },
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    if (this.user) {
      const profileRef = query(
        collection(db, "profile"),
        where("uid", "==", this.user.uid)
      )
      getDocs(profileRef).then((docSnap) => {
        docSnap.forEach((doc) => {
          this.profileId = doc.id
          this.profile = doc.data()
        })
      })
    } else {
      alert("ログインしてください")
      this.$router.push("/signin")
    }
  },
}
</script>

<style>
.j_school {
  display: flex;
  margin-bottom: 10px;
  margin-left: 20px;
}
.h_school {
  display: flex;
  margin-left: 20px;
  margin-bottom: 10px;
}
.c_school {
  display: flex;
  margin-left: 20px;
}

.my_profile {
  width: 350px;
  height: 250px;
  border: solid 2px;
  border-radius: 15px;
  margin: 2rem;
  margin-left: 240px;
  padding: 0.5rem 1rem;
}
.my_profile_goal {
  margin-top: 100px;
  text-align: left;
}
.keireki_profile {
  width: 500px;
  height: 250px;
  border: solid 2px;
  border-radius: 15px;
  margin: 2rem;
  padding: 0.5rem 1rem;
}
.icon {
  border-radius: 30px;
  border: solid 1px;
  height: 50px;
  width: 50px;
}
.top_profile {
  display: flex;
  margin-top: 20px;
}
.profils {
  display: flex;
  margin-left: 200px;
  flex-wrap: wrap;
  width: 950px;
}
.keireki_yohaku {
  margin-right: 10px;
}
.own_profils {
  width: 300px;
  margin-right: 250px;
}

.gakutika_profils {
  width: 300px;
  /* margin-right: 175px; */
}
.gyokai_profils {
  width: 300px;
  margin-right: 250px;
  margin-top: 20px;
}
.other_profils {
  width: 300px;
  margin-top: 20px;
  /* margin-right: 175px; */
}
.daimei {
  border-radius: 10px;
  border: none;
  color: aliceblue;
  background-color: rgba(113, 190, 220, 1);
  margin-bottom: 15px;
  width: 200px;
  height: 40px;
  font-weight: bold;
  /* text-align: center; */
  line-height: 40px;
}
.input_textform {
  width: 200px;
  height: 40px;
}
.input_textform_school {
  resize: horizontal;
  width: 200px;
  height: 20px;
}
.input_textform_goal {
  resize: none;
  height: 40px;
  width: 350px;
}
.input_textform_text {
  /* 理想は文字数制限でもいいかも */
  resize: none;
  width: 500px;
  height: 120px;
}
.edit {
  margin: 30px;
}
.edit-button {
  display: inline-block;
  border-radius: 5%; /* 角丸       */
  text-align: center; /* 文字位置   */
  cursor: pointer; /* カーソル   */
  padding: 10px 10px; /* 余白       */
  background: #82bcd9; /* 背景色     */
  color: #ffffff; /* 文字色     */
  line-height: 1.2em; /* 1行の高さ  */
  transition: 0.3s; /* なめらか変化 */
  box-shadow: 4px 4px 3px #666666; /* 影の設定 */
  text-decoration: none;
  margin-top: 10px;
  margin-bottom: 30px;
  width: 200px;
  font-size: 20px;
}
.edit-button:hover {
  box-shadow: none;
  color: #82bcd9;
  background: #ffffff;
  border: 1px ridge #82bcd9;
}
</style>
