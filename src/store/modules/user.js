import StatusModel from 'Models/StatusModel';
import Message from '@/helpers/MessageBroker';

export default {
	namespaced: true,
	state: {
		skills: [],
		activeSkills: []
	},
	mutations: {
		ADD_ACTIVE_SKILL: (state, skill) => state.activeSkills.push(skill),
		REMOVE_ACTIVE_SKILL: (state, skill) => state.activeSkills = state.activeSkills.filter(s => s !== skill)
	},
	actions: {
		ADD_SKILL: ({ rootState, state, commit }, newSkill) => {
			state.skills.push(newSkill)
			const messagePayload = {
				author: rootState.auth.username,
				action: 'add',
				actionDate: `${new Date().toLocaleDateString('ru-RU')} ${new Date().toLocaleTimeString('ru-RU')}`,
				data: {
					skillName: newSkill.title
				}
			}

			commit('ADD_ACTIVE_SKILL', newSkill.id)
			commit('messages/ADD_MESSAGE', Message(messagePayload), { root: true })
		},
		REMOVE_SKILL: ({ rootState, state, commit }, id) => {
			const foundSkill = state.skills.find(skill => skill.id === id)
			state.skills = state.skills.filter(skill => skill.id !== id)

			const messagePayload = {
				author: rootState.auth.username,
				action: 'remove',
				actionDate: `${new Date().toLocaleDateString('ru-RU')} ${new Date().toLocaleTimeString('ru-RU')}`,
				data: {
					skillName: foundSkill.title
				}
			}
			commit('REMOVE_ACTIVE_SKILL', id)
			commit('messages/ADD_MESSAGE', Message(messagePayload), { root: true })
		},
		SET_SKILL_STATUS: ({ rootState, commit, state }, { stepId, newStatus, daysUntilDeadline, feedback, endDate }) => {
			console.log(rootState.auth.username)

			const messagePayload = {
				author: rootState.auth.username,
				action: 'statusChange',
				actionDate: `${new Date().toLocaleDateString('ru-RU')} ${new Date().toLocaleTimeString('ru-RU')}`,
				data: {}
			}
			const foundSkill = state.skills.find(skill => skill.id === stepId)

			messagePayload.data.skillName = foundSkill.title
			messagePayload.data.oldStatus = foundSkill.status
			messagePayload.data.newStatus = newStatus

			if (foundSkill.status === StatusModel.NEW.id) {
				const startDate = new Date()
				foundSkill.startDate = startDate.toLocaleDateString('ru-RU')
				const deadlineDate = new Date(startDate.setDate(startDate.getDate() + daysUntilDeadline))
				foundSkill.deadlineDate = deadlineDate.toLocaleDateString('ru-RU')

			}

			foundSkill.status = newStatus

			if (feedback) {
				foundSkill.feedback = feedback
			}

			if (endDate) {
				foundSkill.endDate = endDate
			}

			if (newStatus === StatusModel.PASSED.id) {
				commit('REMOVE_ACTIVE_SKILL', foundSkill.id)
			}

			commit('messages/ADD_MESSAGE', Message(messagePayload), { root: true })
		},
		LEAVE_FEEDBACK: ({ rootState, state, commit }, { stepId, feedback }) => {
			const foundStep = state.skills.find(s => s.id === stepId)
			foundStep.feedback = feedback
			commit('messages/ADD_MESSAGE',
				{
					author: rootState.auth.username,
					action: 'feedback',
					actionDate: `${new Date().toLocaleDateString('ru-RU')} ${new Date().toLocaleTimeString('ru-RU')}`,
					data: {
						feedback
					}
				},
				{
					root: true
				}
			)
		}
	}
}
