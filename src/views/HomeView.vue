<template>
  <div class="home">
    <div class="company-list">
      <div v-for="company in companies" :key="company.id">
        <router-link to="/companydetail">{{ company.name }}</router-link>
        {{ company.industry }}
      </div>
    </div>
    <div>
      <router-link to="/addcompany" class="addButton">企業追加</router-link>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
export default {
  components: {},
  data() {
    return {
      user: null,
      companies: [],
    }
  },
  methods: {
    showDetail() {},
  },
  created() {
    getDocs(collection(db, "company")).then((snapshot) => {
      snapshot.forEach((doc) => {
        this.companies.push({
          id: doc.id,
          ...doc.data(),
        })
      })
    })
  },
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
}
.addButton {
  border: 1px;
  border-color: aquamarine;
}
</style>
