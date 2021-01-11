import data from '@/assets/data/courses.json'
import { SkillCategoryModel } from 'Models/SkillModel'

export default {
	namespaced: true,
	state: {
		skillList: data
	},
	mutations: {
		ADD_NEW_SKILL: (state, { newSkill, category }) => state.skillList[category].push(newSkill)
	},
	actions: {
		ADD_NEW_SKILL: ({ state, commit }, newSkill) => {
			console.log('Adding new skill', newSkill)
			let category
			switch(newSkill.category_id) {
				case 1:
					category = 'hard'
					break
				case 2:
					category = 'soft'
					break
				case 3:
					category = 'language'
					break
				default:
					break
			}

			commit('ADD_NEW_SKILL', { newSkill, category })
		}
	}
}
