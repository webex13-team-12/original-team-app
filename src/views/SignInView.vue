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
        <div class="mypage_text">
          何度も使うガクチカを志望動機を登録しよう！<br />目標を立てて頑張れる！
        </div>
      </div>
    </div>

    <div id="link"></div>
    <div v-if="!user" class="form-wrapper">
      <h1 v-if="isSignIn">Sign in</h1>
      <h1 v-else>Create an account</h1>
      <div class="toggle-radio">
        <input @click="toSignIn(1)" type="radio" name="rdo" id="yes" checked />
        <input @click="toSignIn(2)" type="radio" name="rdo" id="no" />
        <div class="switch">
          <label class="toggle-label-left" for="yes">Sign In</label>
          <label class="toggle-label-right" for="no">Sign Up</label>
          <span></span>
        </div>
      </div>
      <form>
        <div class="form-item">
          <label for="email"></label>
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            v-model="email"
          />
        </div>
        <div class="form-item">
          <label for="password"></label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="button-panel">
          <input
            type="button"
            class="button"
            title="Google Login"
            value="Google Login"
            @click="googleSignIn"
          />
          <input
            v-if="isSignIn"
            type="button"
            class="button"
            title="Sign In"
            value="Sign In"
            @click="mailSignIn"
          />
          <input
            v-else
            type="button"
            class="signup-button"
            title="Sign Up"
            value="Sign Up"
            @click="mailSignUp"
          />
        </div>
      </form>
      <div class="form-footer">
        <p><a href="#">パスワードをお忘れの方</a></p>
      </div>
    </div>
    <div v-else class="form-wrapper">
      <h1>Login User</h1>
      <form>
        <div class="form-item">
          <label for="email"></label>
          <input
            type="email"
            name="email"
            placeholder="Email
        Address"
            v-model="user.email"
          />
        </div>
        <div class="form-item">
          <label for="password"></label>
          <input
            type="text"
            name="password"
            placeholder="displayName：未設定"
            v-model="user.displayName"
          />
        </div>
      </form>
      <div class="form-footer">
        <p @click="mailLogOut"><a>ログアウト</a></p>
      </div>
    </div>
  </div>
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
  data() {
    return {
      email: "",
      password: "",
      user: null,
      isSignIn: true,
    }
  },
  methods: {
    toSignIn(num) {
      switch (num) {
        case 1:
          this.isSignIn = true
          break
        case 2:
          this.isSignIn = false
      }
    },
    googleSignIn() {
      const auth = getAuth()
      auth.languageCode = "ja"
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user
          this.user = user
          localStorage.setItem("currentUser", JSON.stringify(user))
          alert(user.email + "でログインしました")
        })
        .catch((error) => {
          alert(error)
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
            localStorage.setItem("currentUser", JSON.stringify(user))

            alert(user.email + "でログインしました")
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
            localStorage.setItem("currentUser", JSON.stringify(user))

            alert(user.email + "でサインアップしました")
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
          alert("ログアウト完了しました.")
        })
        .catch((error) => {
          alert(error.code, error.message)
        })
    },
  },
  computed() {
    this.user = localStorage.getItem("currentUser")
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("currentUser"))
  },
}
</script>
<style scoped>
#login {
  background-color: #59adc7;
  color: white;
  height: 300px;
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

@import url(https://fonts.googleapis.com/css?family=Open+Sans:400);

/* fontawesome */
@import url(http://weloveiconfonts.com/api/?family=fontawesome);
[class*="fontawesome-"]:before {
  font-family: "FontAwesome", sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.form-wrapper {
  background: #d4e5e9;
  margin: 3em auto;
  padding: 0 1em;
  max-width: 370px;
}

h1 {
  text-align: center;
  padding-top: 1em;
  padding-bottom: 2em;
}

form {
  padding: 0 1.5em;
}

.form-item {
  margin-bottom: 0.75em;
  width: 100%;
}

.form-item input {
  background: #fafafa;
  border: none;
  border-bottom: 2px solid #e9e9e9;
  color: #666;
  font-family: "Open Sans", sans-serif;
  font-size: 1em;
  height: 50px;
  transition: border-color 0.3s;
  width: 100%;
}

.form-item input:focus {
  border-bottom: 2px solid #c0c0c0;
  outline: none;
}

.button-panel {
  margin: 1.5em 0 0;
  width: 100%;
  margin-bottom: 5px;
}

.button-panel .button {
  background: #95cbe5;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 50px;
  font-family: "Open Sans", sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.3s ease-in-out;
  width: 100%;
  margin-bottom: 5px;
}

.button-panel .signup-button {
  background: #ec6f5c;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 50px;
  font-family: "Open Sans", sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.3s ease-in-out;
  width: 100%;
  margin-bottom: 5px;
}

.button:hover {
  background: #72b6d8;
}
.signup-button:hover {
  background: #eb4f37;
}

.form-footer {
  font-size: 1em;
  padding: 2em 0;
  text-align: center;
}

.form-footer a {
  color: #8c8c8c;
  text-decoration: none;
  transition: border-color 0.3s;
}

.form-footer a:hover {
  border-bottom: 1px dotted #8c8c8c;
}

.toggle-radio {
  display: block;
}

.switch {
  position: absolute;

  top: 3300px;

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
.resize_bluememo img {
  width: 350px;
}
.resize5 img {
  width: 500px;
  margin-top: 150px;
  margin-left: -70px;
}
.company_left {
  margin-left: 200px;
}
.company_right {
  display: flex;
}
.company_box {
  display: flex;
  margin-top: 100px;
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
