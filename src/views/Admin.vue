<template>
  <div class="row">
    <div class="col s3">
      <div class="card">
        <ul class="collection">
          <li class="collection-item">Yura Kolesnikov</li>
        </ul>
      </div>
    </div>
    {{comments}}
    <div class="col s9">
      <div class="plans">
        <div class="plan card" v-for="plan in filteredPlans" :key="`plan_${plan.id}`">
          <div class="card-content">
            <h4 class="card-title">Plan: {{ plan.title }}</h4>
            <ul>
              <li class="card" v-for="(step, i) in plan.steps" :key="`plan_${plan.id}_step_${step.id}`">
                <div class="card-content">
                  <h5
                      style="cursor: pointer"
                      class="card-title"
                      @click.self="toggleCollapse(step.id)">
                    Step {{ ++i }}: {{ step.title }}
                  </h5>
                  <p v-if="step.startDate && step.endDate">Start date: {{ step.startDate }}. End date: {{ step.endDate }}</p>
                  <textarea v-model="comments[`plan_${plan.id}`][`step_${step.id}`]" class="materialize-textarea"></textarea>
                  <button class="btn" style="margin-right: 10px" @click="approve(plan.id, step.id)">Approve</button>
                  <button class="btn red" @click="decline">Decline</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'
import StatusModel from '@/models/StatusModel';
export default {
  data() {
    return {
      StatusModel,
      comments: {}
    }
  },
  computed: {
    ...mapState('user', ['plans']),
    ...mapGetters('user', ['filteredPlans'])
  },
  methods: {
    ...mapMutations('user', ['SET_STEP_STATUS']),
    approve(planId, stepId) {
      this.SET_STEP_STATUS({
        planId,
        stepId,
        newStatus: StatusModel.PASSED.id,
        feedback: this.comments[`plan_${planId}`][`step_${stepId}`]
      })
    },
    decline(planId, stepId) {
      this.SET_STEP_STATUS({
        planId,
        stepId,
        newStatus: StatusModel.FAILED.id,
        feedback: this.comments[`plan_${planId}`][`step_${stepId}`]
      })
    }
  },
  created() {
    let comments = {}

    this.filteredPlans.forEach(plan => {
      comments[`plan_${plan.id}`] = {}
      plan.steps.forEach(step => {
        comments[`plan_${plan.id}`][`step_${step.id}`] = ''
      })
    })

    this.$set(this, 'comments', comments)
  }
}
</script>
