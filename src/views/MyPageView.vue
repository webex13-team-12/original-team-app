<template>
  <div>
    //このページでやること、 ・入力値の保存 ・
    入力保存後、入力形式なくす・スタイルを直す (マイ画像の登録)
  </div>

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
          v-model="mokuhyo_text"
          placeholder="就活の目標"
        ></textarea>
      </div>
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
        <div class="keireki_yohaku">中学</div>
        <textarea
          class="input_textform_school"
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
        <div class="keireki_yohaku">年</div>

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
      <div class="h_school">
        <div class="keireki_yohaku">高校</div>
        <textarea
          class="input_textform_school"
          v-model="juniorhighschool_text"
          placeholder="高校名を入力してください"
        ></textarea>
        <p>
          <select name="example1">
            <option value="2013">2015</option>
            <option value="2014">2016</option>
            <option value="2015">2017</option>
            <option value="2016">2018</option>
          </select>
        </p>
        <div class="keireki_yohaku">年</div>

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
      <div>ここに大学も入れる</div>
    </div>
  </div>

  <div class="profils">
    <!--5行目題名と入力がセットのdiv -->
    <div class="own_profils">
      <div class="daimei">自己分析</div>
      <textarea
        class="input_textform_text"
        v-model="owntext"
        placeholder="自己分析"
        id="app1"
      ></textarea>
    </div>
    <div class="gakutika_profils">
      <div class="daimei">ガクチカ</div>
      <textarea
        class="input_textform_text"
        v-model="gakutikatext"
        placeholder="学生時代に頑張ったことを入力してみよう"
        id="app"
      ></textarea>
    </div>
    <div class="gyokai_profils">
      <div class="daimei">業界志望理由</div>
      <textarea
        class="input_textform_text"
        v-model="gyokaitext"
        placeholder="その業界を志望している理由"
        id="app"
      ></textarea>
    </div>
    <button>内容を更新する</button>
  </div>
</template>

<script>
export default {
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
}

.my_profile {
  width: 350px;
  height: 250px;
  border: solid 2px;
  border-radius: 15px;
  margin: 2rem;
  margin-left: 130px;
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
}
.profile {
  display: flexbox;
  /* flex-wrap: wrap; */
}
.own_profils {
  width: 200px;
}
.keireki_yohaku {
  margin-right: 10px;
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
  width: 400px;
  height: 100px;
}
</style>
