<template>
  <div class="container">
    <div class="card">
      <div class="card-content">
        <h4 class="form-title">Create new skill</h4>
        <form @submit.prevent="createSkill">
          <div class="row">
            <div class="input-field">
              <input placeholder="Skill name" type="text" v-model="formData.title">
            </div>
          </div>
          <div class="row">
            <div class="input-field">
              <!-- TODO: Заменить на SkillModel данные -->
              <h6>Skill category</h6>
              <p>
                <label>
                  <input name="group1" type="radio" value="1" v-model.number="formData.category_id"/>
                  <span>Hard skills</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="group1" type="radio" value="2" v-model.number="formData.category_id"/>
                  <span>Soft skills</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="group1" type="radio" value="3" v-model.number="formData.category_id"/>
                  <span>Language</span>
                </label>
              </p>
            </div>
          </div>
          <div class="row">
            <h6>Criteria</h6>
            <div class="input-field" v-for="item in formData.skills">
              <div class="row">
                <div class="col s6">
                  <label>Title</label>
                  <input type="text" v-model="item.title" placeholder="Criteria">
                </div>
                <div class="col s6">
                  <label>Link (optional)</label>
                  <input type="text" v-model="item.href">
                </div>
              </div>
            </div>
            <button class="btn btn-small blue" @mousedown="addNewCriteria">Add</button>
          </div>
          <button class="btn">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      formData: {
        title: '',
        category_id: 1,
        skills: [
          { id: 1, title: 'First criteria' }
        ]
      }
    }
  },
  computed: {
    ...mapState('admin', ['skillList']),
  },
  methods: {
    ...mapActions('admin', ['ADD_NEW_SKILL']),
    createSkill() {
      const payload = {
        id: Math.floor(Math.random() * 1000000) + 1,
        ...this.formData
      }

      this.ADD_NEW_SKILL(payload)
    },
    addNewCriteria() {
      this.formData.skills.push({
        id: Math.floor(Math.random() * 100000000) + 1,
        title: ''
      })
    }
  }
}
</script>

<style lang="scss">
.input-field {
  position: relative;


}
</style>
