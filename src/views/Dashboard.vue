<template>
  <div class="container">
    <!--<p>{{userRole}}</p>
    <p>Is admin? {{isAdmin}}</p>
    <p>Is mentor? {{isMentor}}</p>
    <p>Is user? {{isUser}}</p>-->
    <p>User: {{ fullName }}</p>
    <div class="plans">
      <div class="plan card" v-for="plan in plans" :key="`plan_${plan.id}`">
        <div class="card-content">
          <h4 class="card-title">{{ plan.title }}</h4>
          <ul>
            <li class="card" v-for="(step, i) in plan.steps" :key="`plan_${plan.id}_step_${step.id}`">
              <div class="card-content">
                <h5
                  style="cursor: pointer"
                  class="card-title"
                  @click.self="toggleCollapse(step.id)">
                  Step {{ ++i }}: {{ step.title }} <span :class="getBadgeClass(step.status)" class="badge">{{ StatusModel.ID_TO_DATA[step.status].title }}</span>
                </h5>
                <p v-if="step.startDate && step.endDate">Start date: {{ step.startDate }}. End date: {{ step.endDate }}</p>
                <ul class="collection" v-if="openTab === step.id">
                  <li class="collection-item" v-for="(skill, i) in step.skills" :key="`plan_${plan.id}_step_${step.id}_skill_${i}`">
                    <template v-if="skill.href">
                      <a target="_blank" rel="noreferrer" :href="skill.href">{{ skill.title }}</a>
                    </template>
                    <template v-else>{{ skill.title }}</template>
                  </li>
                </ul>
                <p v-if="(step.status === StatusModel.PASSED.id || StatusModel.FAILED.id) && step.feedback">Feedback: {{ step.feedback }}</p>
              </div>
              <div class="card-action" v-if="openTab === step.id">
                <button class="btn" @click="startStep(plan.id, step.id)" v-if="step.status === StatusModel.NEW.id">Start</button>
                <button class="btn" @click="testStep(plan.id, step.id)" v-if="step.status === StatusModel.IN_PROGRESS.id">Test</button>
                <button class="btn" @click="testStep(plan.id, step.id)" v-if="step.status === StatusModel.FAILED.id">Test again</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserModel from 'Models/UserModel';
import { mapState, mapMutations } from 'vuex'
import StatusModel from 'Models/StatusModel';
export default {
  data() {
    return {
      openTab: null,
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
    },
    toggleCollapse(id) {
      this.openTab = id
    },
    getBadgeClass(status) {
      if (status === StatusModel.NEW.id) {
        return 'purple darken-1 white-text'
      } else if (status === StatusModel.IN_PROGRESS.id) {
        return 'yellow darken-1 white-text'
      } else if (status === StatusModel.TESTING.id) {
        return 'cyan darken-2 white-text'
      } else if (status === StatusModel.PASSED.id) {
        return 'green darken-2 white-text'
      } else {
        return 'red white-text'
      }
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
