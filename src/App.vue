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
            <li v-if="isLoggedIn && isAdmin"><router-link to="/create">Create skill</router-link></li>
            <li><router-link to="/sign-in">Sign in</router-link></li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Message from '@/helpers/MessageBroker';
import skillList from '@/assets/data/courses.json';
export default {
  computed: {
    ...mapMutations('admin', ['SET_SKILLS']),
    ...mapState('auth', ['isLoggedIn', 'username']),
    ...mapGetters('auth', ['isAdmin', 'isUser', 'isMentor'])
  }
}
</script>
