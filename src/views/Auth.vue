<template>
  <div class="container">
    <div class="card">
      <div class="card-content">
        <form @submit.prevent="handleSubmit">
          <h4>Log in</h4>
          <div class="row">
            <div class="input-field">
              <input placeholder="Username" id="username" class="validate" v-model="userData.username">
            </div>
          </div>
          <div class="row">
            <div class="input-field">
              <input placeholder="Password" type="text" name="password" id="password" class="validate" v-model="userData.password">
            </div>
          </div>
          <button class="btn">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      userData: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['isAdmin', 'isUser', 'isMentor'])
  },
  methods: {
    ...mapActions('auth', ['LOG_IN']),
    handleSubmit() {
      console.log({
        ...this.userData
      })
      this.LOG_IN(this.userData)
      .then(() => {
        this.$router.push({ path: this.isUser ? '/dashboard' : '/admin' })
      })
      .catch(e => console.log(e))
    }
  }
}
</script>
