<template>
  <div class="container">
    <!--<p>{{userRole}}</p>
    <p>Is admin? {{isAdmin}}</p>
    <p>Is mentor? {{isMentor}}</p>
    <p>Is user? {{isUser}}</p>-->
    <p>User: {{ username }}</p>
    <div class="header">
      <h4>Junior Frontend Developer</h4>
      <download-excel class="btn green darken-1" :data="excelData">
        Export
      </download-excel>
    </div>
    <div class="row">
      <div class="col s8">
        <div class="skills">
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
                <p v-if="step.feedback">Feedback: {{ step.feedback }}</p>
              </div>
              <div class="card-action" v-if="openTab === step.id">
                <div class="input-field" v-if="step.status === StatusModel.NEW.id">
                  <input placeholder="Кол-во дней на выполнение" type="text" name="daysUntilDeadline" id="daysUntilDeadline" v-model.number="daysUntilDeadline">
                </div>
                <button style="margin-right: 15px" class="btn blue" @click="startStep(step.id)" v-if="step.status === StatusModel.NEW.id">Start</button>
                <button style="margin-right: 15px" class="btn green" @click="finishStep(step.id)" v-if="step.status === StatusModel.IN_PROGRESS.id">Finish</button>
                <button class="btn red" @click="removeSkill(step.id)">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col s4">
        <div class="card">
          <div class="paginator">
            <div
              class="paginator__item"
              :class="{'paginator__item--active': activeTab === 'hard'}"
              @click="changeTab('hard')">Hard skills</div>
            <div
              class="paginator__item"
              :class="{'paginator__item--active': activeTab === 'soft'}"
              @click="changeTab('soft')">Soft skills</div>
            <div
              class="paginator__item"
              :class="{'paginator__item--active': activeTab === 'language'}"
              @click="changeTab('language')">Language</div>
          </div>
          <div class="skills">
            <ul class="collection">
              <li
                class="collection-item"
                style="cursor:pointer;"
                :class="{'collection-item--active': activeSkills.includes(skill.id)}"
                v-for="skill in skillList[activeTab]"
                :key="`skill_${skill.id}`"
                @click="addSkill(skill)">
                {{ skill.title }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserModel from 'Models/UserModel';
import { mapState, mapActions } from 'vuex'
import StatusModel from 'Models/StatusModel';
import { SkillModel, SkillCategoryModel } from 'Models/SkillModel';
import data from '@/assets/data/courses.json';
import Message from '@/helpers/MessageBroker';

export default {
  data() {
    return {
      openTab: null,
      UserModel,
      StatusModel,
      SkillModel,
      SkillCategoryModel,
      data,
      activeTab: 'hard',
      daysUntilDeadline: null
    }
  },
  methods: {
    ...mapActions('user', ['ADD_SKILL', 'REMOVE_SKILL', 'SET_SKILL_STATUS']),
    startStep(stepId) {
      this.SET_SKILL_STATUS({
        stepId,
        newStatus: StatusModel.IN_PROGRESS.id,
        daysUntilDeadline: this.daysUntilDeadline
      })
      this.daysUntilDeadline = null
    },
    finishStep(stepId) {
      this.SET_SKILL_STATUS({ stepId, newStatus: StatusModel.PASSED.id, endDate: new Date().toLocaleDateString('ru-RU') })
      this.openTab = null
    },
    addSkill(skill) {
      this.ADD_SKILL({
        ...skill,
        startDate: null,
        endDate: null,
        status: StatusModel.NEW.id,
        feedback: ''
      })
    },
    removeSkill(id) {
      this.REMOVE_SKILL(id)
    },
    toggleCollapse(id) {
      if (this.openTab === id) {
        this.openTab = null
      } else {
        this.openTab = id
      }
    },
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
    changeTab(tab) {
      this.activeTab = tab;
    },
  },
  computed: {
    ...mapState('admin', ['skillList']),
    ...mapState('auth', ['userStatus', 'username']),
    ...mapState('user', ['skills', 'activeSkills']),
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
    },
    excelData() {
      return this.skills.map((item, i) => ({
        '№': i++,
        'Название': item.title,
        'Критерии': item.skills.reduce((acc, curr, i) => {
          return i < item.skills.length - 1 ? acc += `${curr.title || ''}\n\r` : acc += curr.title || ''
        }, ''),
        'Ресурсы': item.skills.reduce((acc, curr, i) => {
          return i < item.skills.length - 1 ? acc += `${curr.href || ''}\n\r` : acc += curr.href || ''
        }, '')
      }))
    }
  }
}
</script>


<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h4 {
    margin: 0;
  }
}

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
.collection-item {
  transition: opacity .25s ease;
}

.collection-item--active {
  user-select: none;
  pointer-events: none;
  opacity: .5;
}
</style>
