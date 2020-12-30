<template>
  <div id="app">
    <div class="navbar-fixed">
      <nav style="padding: 0 10px">
        <div class="nav-wrapper">
          <router-link class="brand-logo" to="/">Roadmap App</router-link>
          <ul class="right hide-on-med-and-down">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/dashboard">Dashboard</router-link></li>
            <li><router-link to="/sign-in">Sign in</router-link></li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

}
</script>
