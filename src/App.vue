<template>
  <div id="app">
    <div class="navbar-fixed">
      <nav style="padding: 0 10px">
        <div class="nav-wrapper">
          <router-link class="brand-logo" to="/">Roadmap App</router-link>
          <ul class="right hide-on-med-and-down">
            <li v-if="username">Username: {{ username }}</li>
            <li><router-link to="/">Home</router-link></li>
            <li v-if="isLoggedIn && isUser"><router-link to="/dashboard">Dashboard</router-link></li>
            <li><router-link to="/sign-in">Sign in</router-link></li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Message from '@/helpers/MessageBroker';
export default {
  computed: {
    ...mapState('auth', ['isLoggedIn', 'username']),
    ...mapGetters('auth', ['isAdmin', 'isUser', 'isMentor'])
  }
}
</script>
