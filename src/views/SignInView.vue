<template>
  <div class="top_box">
    <div>
      <p class="top_daimei">就活を、自分を、クリアにできるサイト</p>

      <a href="#link" class="btn btn-malformation">ログイン</a>
    </div>

    <div class="resizeimage">
      <img src="@/assets/y0702.png" alt="メイン画像" />
    </div>
  </div>

  <div class="site_content">
    <div class="anoy_box">
      <div>
        <div class="anoy_daimei">就活生こんな悩みはありませんか?</div>
        <div class="anoy_text">
          <br />
          ・自己分析が分からない<br />
          ・企業管理が難しい<br />
        </div>
      </div>
      <div class="resize1">
        <img src="@/assets/manyinfo.png" alt="悩む男の人" />
      </div>
    </div>
    <div class="jiko_box">
      <div class="jiko_left">
        <div class="resize_ice">
          <img src="@/assets/hyozan.png" alt="氷山の一角" />
        </div>
        <div class="resize3">
          <img src="@/assets/一緒に考える.png" alt="解決" />
        </div>
      </div>
      <div>
        <div class="jiko_daimei">自己分析を共有</div>
        <div class="jiko_text">
          自己分析に終わりがない<br />
          自分の軸が見つからない<br />
          そんな時に他の人の人生グラフを覗きたくなりませんか?<br />
          <br />
          自分の分析に相手からコメントが届く！
        </div>
      </div>
    </div>

    <div class="company_box">
      <div class="company_left">
        <div class="company_daimei">企業管理を一括に</div>
        <div class="company_text">
          煩わしい企業ごとの情報を一括管理！<br />マイページURL <br />
          ログインID <br />提出したES
        </div>
      </div>
      <div class="company_right">
        <div class="resize_bluememo">
          <img src="@/assets/bluebook.png" alt="青いメモ" />
        </div>
        <div class="resize5">
          <img src="@/assets/y1183.png" alt="黄色PC管理" />
        </div>
      </div>
    </div>
    <div class="mypage_box">
      <div class="myapage_left">
        <div class="resize_mypageimage">
          <img src="@/assets/y0918.png" alt="マイページ画像" />
        </div>
      </div>
      <div class="mypage_right">
        <div class="mypage_daimei">あなただけの過去・未来<br /></div>
        <div class="mypage_text">マイページ機能の説明</div>
        <div>マイページ</div>
      </div>
    </div>

    <div id="link"></div>
    <div id="login" class="login_box">
      <div class="logIn-input">
        <div class="text">メールアドレス</div>
        <input type="email" v-model="email" placeholder="メールアドレス" />
      </div>
      <div class="logIn-input">
        <div class="text">パスワード</div>
        <input type="password" v-model="password" placeholder="パスワード" />
      </div>
      <button @click="mailSignUp" v-bind:disabled="user !== null">
        アカウント新規作成
      </button>
      <div>
        <button @click="mailSignIn" v-bind:disabled="user !== null">
          ログイン
        </button>
        <button @click="mailLogOut" v-bind:disabled="user == null">
          ログアウト
        </button>
      </div>

      <button @click="googleSignIn" v-bind:disabled="user !== null">
        Googleでログイン
      </button>
    </div>
    <div class="under_var"></div>
  </div>

  <!-- この空画像は一旦srcのassetsに入ってる -->
  <!-- <div class="top_daimei">就活を、自分を、クリアに</div> -->
  <!-- <img src="@/assets/busy_woman.png" alt="悩み女性" /> -->
</template>

<script>
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
export default {
  inject: ["currentUser"],
  data() {
    return {
      email: "",
      password: "",
      user: null,
    }
  },
  props: ["currentUser"],
  methods: {
    googleSignIn() {
      const auth = getAuth()
      auth.languageCode = "ja"
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user
          this.user = user
          JSON.parse(localStorage.setItem("currentUser", JSON.stringify(user)))
          alert(user.email + "ログイン完了！")
        })
        .catch((error) => {
          console.log(error)
        })
    },
    mailSignIn() {
      if (this.email.match("@")) {
        const auth = getAuth()
        auth.languageCode = "ja"
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user

            this.user = user
            JSON.parse(
              localStorage.setItem("currentUser", JSON.stringify(user))
            )
            alert(this.user.email + "でログインしました")
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            alert(errorCode, errorMessage)
          })
      } else {
        alert("正しいメールアドレスを記入してください")
      }
    },
    mailSignUp() {
      const auth = getAuth()
      if (this.email.match("@")) {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user
            this.user = user
            JSON.parse(
              localStorage.setItem("currentUser", JSON.stringify(user))
            )

            alert(this.user.email + "でサインアップしました")
          })
          .catch((err) => {
            const errorCode = err.code
            const errorMessage = err.message
            alert(errorCode, errorMessage)
          })
      } else {
        alert("正しいメールアドレスを記入してください")
      }
    },
    mailLogOut() {
      const auth = getAuth()
      signOut(auth)
        .then(() => {
          localStorage.removeItem("currentUser")
          this.user = null
          alert("Sign-out successful.")
        })
        .catch((error) => {
          alert(error.code, error.message)
        })
    },
  },
  computed() {
    this.user = localStorage.getItem("currentUser")
    console.log()
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
    console.log(this.user, "signin")
  },
}
</script>
<style scoped>
.top_daimei {
  font-size: 2.5rem;
  margin-left: 80px;
  margin-top: 170px;
  /* font-family: "ヒラギノ明朝 Pro W3", "Hiragino Mincho Pro", "游明朝",
    "Yu Mincho", "游明朝体", "YuMincho", "ＭＳ Ｐ明朝", "MS PMincho", serif; */
  font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体";
}
/* #login {
  background-color: #59adc7;
  color: rgb(24, 22, 22);
  height: 300px;
} */
.login_box {
  /* background-color: #59adc7; */
  color: rgb(24, 22, 22);
  height: 300px;
  margin: 200px;
  margin-left: 310px;
  margin-right: 310px;
  padding: 50px;

  border: solid;
  border-color: #59adc7;
  border-width: 3px;
}
.logIn-input {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
input {
  border-radius: 20px;
  text-align: center;
}
.text {
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
}
button {
  padding: 10px;
  margin-top: 5px;
}
*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 50.5%;
}

.btn {
  margin-top: 50px;
}
a.btn,
button.btn {
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;
  position: relative;
  display: inline-block;
  padding: 1rem 3rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}

a.btn-malformation {
  font-size: 2rem;

  padding: 3rem 4rem;

  color: #fff;
  border-radius: 100% 80px / 80px 100%;
  background-color: #f1e758ec;
}

a.btn-malformation:hover {
  color: #fff;
  border-radius: 60% 80% / 100% 80%;
}

.top_box {
  display: flex;
  margin-top: 30px;
  margin: 50px;
  margin-bottom: 120px;
}
/* .top_box.p {
  font-size: 50px;
} */

.site_content {
  background-image: url(/Users/otamiyu/Downloads/webex/original-team-app/src/assets/reregeek.png);
  background-position: 50% 10%;
}
.resizeimage img {
  /* width: 40%; */
  width: 450px;
  margin-left: 30px;
  margin-top: auto;
}
.resizeimage {
  margin-top: 20px;
}

.resize1 img {
  width: 400px;
}

.resize_bluememo img {
  width: 400px;
}
.resize5 img {
  width: 400px;
}

.anoy_daimei {
  background-color: #59adc7;
  width: 430px;
  height: 80px;

  color: #f8fbfc;
  font-size: 25px;
  font-weight: bold;
  text-align: center;

  margin-left: 200px;
  display: grid;
  place-items: center;
}
.anoy_text {
  margin-left: 200px;
  text-align: left;
  font-size: large;
}
.anoy_box {
  display: flex;
  /* margin-bottom: 0px; */
}

.jiko_daimei {
  background-color: #59adc7;
  width: 400px;
  height: 80px;
  font-size: 25px;
  font-weight: bold;

  margin-left: 150px;
  margin-top: 40px;

  color: #f8fbfc;
  display: grid;
  place-items: center;
}

.jiko_text {
  margin-left: 150px;
  margin-top: 30px;

  text-align: left;
  font-size: large;
}
.resize_ice img {
  width: 250px;
  margin-left: 50px;
  margin-top: -30px;
}
.resize3 img {
  width: 500px;
  margin-left: -60px;
}
.jiko_left {
  display: flex;
  margin-top: 90px;
}
.jiko_box {
  display: flex;
}
.company_daimei {
  background-color: #59adc7;
  width: 430px;
  height: 80px;
  font-size: 25px;
  font-weight: bold;

  color: #f8fbfc;
  display: grid;
  place-items: center;
}
.company_text {
  text-align: left;
  font-size: large;

  margin-top: 30px;
}
.company_left {
  margin-left: 200px;
}
.company_right {
  display: flex;
}
.company_box {
  display: flex;
  margin-top: 50px;
}
.mypage_daimei {
  background-color: #59adc7;
  width: 430px;
  height: 80px;
  font-size: 25px;
  font-weight: bold;

  color: #f8fbfc;
  display: grid;
  place-items: center;
}
.mypage_text {
  text-align: left;
  font-size: large;

  margin-top: 30px;
}
.mypage_box {
  display: flex;
  margin-left: 150px;

  margin-top: 200px;
}
.mypage_left {
  display: flex;
  margin-top: 90px;
}
.mypage_right {
  margin-left: 130px;
}
.resize_mypageimage img {
  width: 500px;
}
.under_var {
  background-color: #59adc7;
  height: 80px;
}
</style>
