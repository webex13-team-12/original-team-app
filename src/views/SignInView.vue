<template>
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
      </div>
      <div v-if="isSignIn" class="button-panel">
        <input
          type="button"
          class="button"
          title="Sign In"
          value="Sign In"
          @click="mailSignIn"
        />
      </div>
      <div v-else class="button-panel">
        <input
          type="button"
          class="button"
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
  // props: ["currentUser"],
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
  background: #fafafa;
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
  margin: 1em 0 0;
  width: 100%;
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
}

.button:hover {
  background: #72b6d8;
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
  top: 205px;
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
