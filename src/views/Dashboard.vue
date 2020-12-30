<template>
  <div class="about">
    Dashboard
    <p>{{userRole}}</p>
    <p>Is admin? {{isAdmin}}</p>
    <p>Is mentor? {{isMentor}}</p>
    <p>Is user? {{isUser}}</p>
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
    },
    isAdmin() {
      return this.userStatus === UserModel.ADMIN.id
    },
    isMentor() {
      return this.userStatus === UserModel.MENTOR.id
    },
    isUser() {
      return this.userStatus === UserModel.USER.id
    }
  }
}
</script>
