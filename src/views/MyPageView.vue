diff --git a/src/components/Upload.vue b/src/components/Upload.vue index
77a5175..659d3b5 100644 b/src/components/Upload.vue

<template>
  <div>
    //このページでやること、やりたいこと<br />
    ・入力値の保存 ・ 入力保存後、入力形式なくす・スタイルを直す<br />
    ・タブバーを統一したやつにする ・その他入れる項目を確認する
    ・入力するところのサイズ固定 (マイ画像の登録)
  </div>

  <div class="top_profile">
    <div class="my_profile">
      <!-- <div> 画像をアップロードしたかった
      <label v-if="!value" class="upload-content-space user-photo default">
        <input ref="file" class="file-button" type="file" @change="upload" />
        アップロードする
      </label>

      <div v-if="value" class="uploaded">
        <label class="upload-content-space user-photo">
          <input ref="file" class="file-button" type="file" @change="upload" />
          <img class="user-photo-image" :src="value" />
        </label>
      </div>
    </div> -->
      <div class="top_profile">
        <div class="icon"></div>
        <div>名前を入れたい</div>
      </div>

      <div>目標</div>
      <textarea
        class="input_textform"
        v-model="mokuhyo_text"
        placeholder="就活の目標"
      ></textarea>
    </div>
    <div class="keireki_profile">
      <div>資格</div>
      <textarea
        class="input_textform"
        v-model="sikaku_text"
        placeholder="取得資格を入力"
      ></textarea>
      <div>入学卒業</div>
      <div class="j_school">
        <textarea
          class="input_textform"
          v-model="juniorhighschool_text"
          placeholder="中学校名を入力してください"
        ></textarea>
        <p>
          <select name="example1">
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
          </select>
        </p>
        <div>年</div>

        <p>
          <select name="example2">
            <option value="卒業">卒業</option>
            <option value="入学">入学</option>
            <option value="留学">留学</option>
            <option value="留年">留年</option>
          </select>
        </p>
        <!-- <p><input type="submit" value="決定" /></p> -->
      </div>
      <div>ここに高校大学も入れる</div>
    </div>
  </div>

  <div class="profils">
    <!--5行目題名と入力がセットのdiv -->
    <div class="own_profils">
      <div class="daimei">自己分析</div>
      <textarea
        class="input_textform"
        v-model="owntext"
        placeholder="自己分析"
        id="app1"
      ></textarea>
    </div>
    <div class="gakutika_profils">
      <div class="daimei">ガクチカ</div>
      <textarea
        class="input_textform"
        v-model="gakutikatext"
        placeholder="学生時代に頑張ったことを入力してみよう"
        id="app"
      ></textarea>
    </div>
    <div class="gyokai_profils">
      <div class="daimei">業界志望理由</div>
      <textarea
        class="input_textform"
        v-model="gyokaitext"
        placeholder="その業界を志望している理由"
        id="app"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  //   name: "UpLoad",
  //   props: {
  //     value: {
  //       type: String,
  //       default: null,
  //     },
  //   },

  data() {
    return {
      mokuhyo_text: "",
      sikaku_text: "",
      juniorhighschool_text: "",
      owntext: "",
      gakutikatext: "",
      gyokaitext: "",
      file: null,
    }
  },
  //   methods: {
  //     async upload(event) {
  //       const files = event.target.files || event.dataTransfer.files
  //       const file = files[0]

  //       if (this.checkFile(file)) {
  //         const picture = await this.getBase64(file)
  //         this.$emit("input", picture)
  //       }
  //     },
  //     getBase64(file) {
  //       return new Promise((resolve, reject) => {
  //         const reader = new FileReader()
  //         reader.readAsDataURL(file)
  //         reader.onload = () => resolve(reader.result)
  //         reader.onerror = (error) => reject(error)
  //       })
  //     },
  //     checkFile(file) {
  //       let result = true
  //       const SIZE_LIMIT = 5000000 // 5MB
  //       // キャンセルしたら処理中断
  //       if (!file) {
  //         result = false
  //       }
  //       // jpeg か png 関連ファイル以外は受付けない
  //       if (file.type !== "image/jpeg" && file.type !== "image/png") {
  //         result = false
  //       }
  //       // 上限サイズより大きければ受付けない
  //       if (file.size > SIZE_LIMIT) {
  //         result = false
  //       }
  //       return result
  //     },
  //   },
}
</script>

<style>
.j_school {
  display: flex;
}
.my_profile {
  width: 200px;
  height: 150px;
  border: solid 2px;
  border-radius: 15px;
  margin: 2rem;
  padding: 0.5rem 1rem;
}
.keireki_profile {
  width: 300px;
  height: 150px;
  border: solid 2px;
  border-radius: 15px;
  margin: 2rem;
  padding: 0.5rem 1rem;
}
.icon {
  border-radius: 30px;
  border: solid 1px;
  height: 40px;
  width: 40px;
}
.top_profile {
  display: flex;
}
.profile {
  display: flex;
  flex-wrap: wrap;
}
.own_profils {
  width: 200px;
}
.gakutika_profils {
  width: 200px;
}
.gyokai_profils {
  width: 200px;
}
.daimei {
  border-radius: 10px;
  border: none;
  color: aliceblue;
  background-color: rgba(113, 190, 220, 1);
  margin-bottom: 15px;
  width: 200px;
  height: 40px;

  text-align: center;
}
.input_textform {
  width: 200px;
  height: 40px;
}
</style>
