<template>
  <img src="aozorara.jpg" alt="空" />
  <div class="top_daimei">就活を、自分を、クリアに</div>
  <img src="busy_woman" alt="女性" />
  <div>就活でこんなことありませんか?</div>

  <div id="login">
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
  font-family: "ヒラギノ明朝 Pro W3", "Hiragino Mincho Pro", "游明朝",
    "Yu Mincho", "游明朝体", "YuMincho", "ＭＳ Ｐ明朝", "MS PMincho", serif;
}
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
</style>
