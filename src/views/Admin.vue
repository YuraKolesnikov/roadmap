<template>
  <div class="row">
    <div class="col s3">
      <div class="card">
        <ul class="collection">
          <li class="collection-item">Yura Kolesnikov</li>
        </ul>
      </div>
    </div>
    <div class="paginator">
      <div
          class="paginator__item"
          :class="{'paginator__item--active': activeTab === 'skills'}"
          @click="changeTab('skills')">Skills</div>
      <div
          class="paginator__item"
          :class="{'paginator__item--active': activeTab === 'log'}"
          @click="changeTab('log')">Activity log</div>
    </div>
    <div class="col s8" v-if="activeTab === 'log'">
      <ul>
        <li v-for="message in messages">
          {{ message }}
        </li>
      </ul>
    </div>
    <div class="col s8" v-else>
      <div v-for="(step, i) in skills" :key="`skill_${step.id}`" class="skill">
        <div class="card">
          <div class="card-content" style="position: relative">
            <h5 style="cursor: pointer;" class="card-title" @click.self="toggleCollapse(step.id)">
              Step {{ ++i }}: {{ step.title }}
              <span :class="getBadgeClass(step.status)" class="badge" style="position: absolute; right: 10px; top: 10px">
                  {{ StatusModel.ID_TO_DATA[step.status].title }}
                  </span>
            </h5>

            <p v-if="step.startDate && step.deadlineDate">Start date: {{ step.startDate }}. Deadline date: {{ step.deadlineDate }}</p>
            <p v-if="step.status === StatusModel.PASSED.id && step.endDate">Фактическая дата окончания: {{ step.endDate }}</p>
            <ul
                class="collection"
                v-if="openTab === step.id">
              <li class="collection-item" v-for="(skill, i) in step.skills" :key="i">
                <template v-if="skill.href">
                  <a target="_blank" rel="noreferrer" :href="skill.href">{{ skill.title }}</a>
                </template>
                <template v-else>{{ skill.title }}</template>
              </li>
            </ul>
          </div>
          <div class="card-action" v-if="openTab === step.id">
            <div class="input-field">
              <input placeholder="Feedback" type="text" name="feedback" id="feedback" v-model="feedback">
              <button class="btn" @click="leaveFeedback(step.id)">Leave feedback</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
import StatusModel from '@/models/StatusModel';
export default {
  data() {
    return {
      StatusModel,
      comments: {},
      openTab: null,
      activeTab: 'skills',
      feedback: ''
    }
  },
  computed: {
    ...mapState('user', ['plans', 'skills']),
    ...mapState('messages', ['messages']),
    ...mapState('auth', ['username']),
    ...mapGetters('user', ['filteredPlans'])
  },
  methods: {
    ...mapMutations('user', ['SET_STEP_STATUS']),
    ...mapActions('user', ['SET_SKILL_STATUS', 'LEAVE_FEEDBACK']),
    getBadgeClass(status) {
      if (status === StatusModel.NEW.id) {
        return 'purple darken-1 white-text'
      } else if (status === StatusModel.IN_PROGRESS.id) {
        return 'yellow darken-1 white-text'
      } else if (status === StatusModel.PASSED.id) {
        return 'green darken-2 white-text'
      } else {
        return 'red white-text'
      }
    },
    toggleCollapse(id) {
      if (this.openTab === id) {
        this.openTab = null
      } else {
        this.openTab = id
      }
    },
    changeTab(tab) {
      this.activeTab = tab
    },
    leaveFeedback(stepId) {
      this.LEAVE_FEEDBACK({
        stepId,
        feedback: this.feedback
      })
      this.feedback = null
    }
  }
}
</script>

<style lang="scss">
.paginator {
  display: flex;
  align-items: center;
  padding: 8px;
}

.paginator__item {
  cursor: pointer;
  transition: all .25s ease;
  opacity: .7;
  font-weight: 600;

  &:not(:last-child) {
    margin-right: 16px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: -9px;
      height: 100%;
      width: 1px;
      background-color: #000;
      z-index: 2;
      opacity: .8;
    }
  }

  &--active {
    opacity: 1;
  }
}
</style>
