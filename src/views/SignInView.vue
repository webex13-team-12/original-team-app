<template>
  <div id="login">
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
    <button @click="mailSignUp">アカウント新規作成</button>
    <button @click="mailSignIn">ログイン</button>
    <button @click="mailLogOut" v-bind:disabled="user == null">
      ログアウト
    </button>
  </div>
  <button @click="googleSignIn">googleSignIn</button>
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
  methods: {
    googleSignIn() {
      const auth = getAuth()
      auth.languageCode = "ja"
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user
          this.user = user
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
            this.$emit("updateUser", user)
            alert(this.user.email + "でログインしました")
            // ...
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
      // auth.languageCode = "ja"
      if (this.email.match("@")) {
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user
            this.user = user
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
          alert("Sign-out successful.")
        })
        .catch((error) => {
          alert(error.code, error.message)
        })
    },
  },
  computed() {
    const auth = getAuth()
    const user = auth.currentUser
    this.user = user
  },
}
</script>
