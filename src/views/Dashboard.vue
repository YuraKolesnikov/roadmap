<template>
  <div class="about">
    Dashboard
    <!--<p>{{userRole}}</p>
    <p>Is admin? {{isAdmin}}</p>
    <p>Is mentor? {{isMentor}}</p>
    <p>Is user? {{isUser}}</p>-->
    <p>User: {{ fullName }}</p>
    <div class="plans">
      <div class="plan" v-for="plan in plans" :key="`plan_${plan.id}`">
        <h4 class="plan__title">{{ plan.title }}</h4>
        <ul class="steps">
          <li class="steps__item" v-for="(step, i) in plan.steps" :key="`plan_${plan.id}_step_${step.id}`">
            <h5>Step {{ ++i }}: {{ step.title }} ({{ StatusModel.ID_TO_DATA[step.status].title }})</h5>
            <p v-if="step.startDate && step.endDate">Start date: {{ step.startDate }}. End date: {{ step.endDate }}</p>
            <ul class="skills">
              <li v-for="(skill, i) in step.skills" :key="`plan_${plan.id}_step_${step.id}_skill_${i}`">
                <template v-if="skill.href">
                  <a target="_blank" rel="noreferrer" :href="skill.href">{{ skill.title }}</a>
                </template>
                <template v-else>{{ skill.title }}</template>
              </li>
            </ul>
            <button @click="startStep(plan.id, step.id)" v-if="step.status === StatusModel.NEW.id">Start</button>
            <button @click="testStep(plan.id, step.id)" v-if="step.status === StatusModel.IN_PROGRESS.id">Test</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UserModel from '@/models/UserModel';
import { mapState, mapMutations } from 'vuex'
import StatusModel from '@/models/StatusModel';
export default {
  data() {
    return {
      UserModel,
      StatusModel
    }
  },
  methods: {
    ...mapMutations('user', ['SET_STEP_STATUS']),
    startStep(planId, stepId) {
      let today = new Date()
      today.setDate(today.getDate() + 10);
      this.SET_STEP_STATUS({ planId, stepId, newStatus: StatusModel.IN_PROGRESS.id })
    },
    testStep(planId, stepId) {
      this.SET_STEP_STATUS({ planId, stepId, newStatus: StatusModel.TESTING.id })
    }
  },
  computed: {
    ...mapState('auth', ['userStatus']),
    ...mapState('user', ['fullName', 'plans']),
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
