<template>
  <form @submit.prevent="handleSubmit">
    <legend>Log in</legend>
    <fieldset>
      <label for="username">Username</label>
      <input type="text" name="username" id="username" v-model="userData.username">
    </fieldset>
    <fieldset>
      <label for="password">Password</label>
      <input type="text" name="password" id="password" v-model="userData.password">
    </fieldset>
    <button>Sign in</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      userData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['LOG_IN']),
    handleSubmit() {
      console.log({
        ...this.userData
      })
      this.LOG_IN(this.userData)
      .then(() => this.$router.push({ path: '/dashboard' }))
      .catch(e => console.log(e))
    }
  }
}
</script>
