<template>
  <div class="about">
    Dashboard
    <p>{{userRole}}</p>
  </div>
</template>

<script>
import UserModel from '@/models/UserModel';
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('auth', ['userStatus']),
    userRole() {
      return UserModel.ID_TO_DATA[this.userStatus]
    }
  }
}
</script>
