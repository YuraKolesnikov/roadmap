import StatusModel from 'Models/StatusModel';

export default {
	namespaced: true,
	state: {
		fullName: 'Yura Kolesnikov',
		plans: [
			{
				id: 1,
				title: 'Junior Frontend Developer',
				status: StatusModel.NEW.id, /* только NEW / IN_PROGRESS / PASSED, так как весь роадмап невозможно держать в статусе TESTING/FAILED, нелогично */
				steps: [
					{
						id: 1,
						title: 'HTML & CSS Basics',
						startDate: '', /* Генерится при нажатии на кнопку Start */
						endDate: '', /* Отсчитывается startDate + daysUntilDeadline */
						daysUntilDeadline: 10, /* Кол-во дней, правится в админке */
						status: StatusModel.NEW.id, /* Если NEW - то видна кнопка Start, если IN_PROGRESS/FAILED - видна кнопка Test */
						skills: [
							{ title: 'Basic HTML tags' },
							{ title: 'Advanced HTML tags' },
							{ title: 'Стандарты HTML, как браузер рендерит HTML' },
							{ title: 'Каскадность, приоритетность, вложенность стилей', href: 'https://developer.mozilla.org/ru/docs/Learn/CSS/First_steps/How_CSS_works' }
						],
						feedback: '' /* Пишется ментором при аппруве блока */
					},
					{
						id: 2,
						title: 'HTML & CSS Basics',
						startDate: '', /* Генерится при нажатии на кнопку Start */
						endDate: '', /* Отсчитывается startDate + daysUntilDeadline */
						daysUntilDeadline: 5, /* Кол-во дней, правится в админке */
						status: StatusModel.NEW.id, /* Если NEW - то видна кнопка Start, если IN_PROGRESS/FAILED - видна кнопка Test */
						skills: [
							{ title: 'template' },
							{ title: 'aria-attributes' }
						],
						feedback: '' /* Пишется ментором при аппруве блока */
					}
				]
			}
		],
		skills: []
	},
	getters: {
		filteredPlans: state => state.plans.map(plan => ({
			...plan,
			steps: plan.steps.filter(step => step.status === StatusModel.TESTING.id)
		}))
			.filter(plan => !!plan.steps.length)
	},
	mutations: {
		SET_STEP_STATUS: (state, { stepId, newStatus, feedback, endDate }) => {
			console.log(feedback)
			const foundPlan = state.plans.find(plan => plan.id === planId)
			const foundStep = foundPlan.steps.find(step => step.id === stepId)
			if (foundStep.status === StatusModel.NEW.id) {
				const startDate = new Date()
				foundStep.startDate = startDate.toLocaleDateString('ru-RU')
				const deadlineDate = new Date(startDate.setDate(startDate.getDate() + foundStep.daysUntilDeadline))
				foundStep.deadlineDate = deadlineDate.toLocaleDateString('ru-RU')
			}
			foundStep.status = newStatus

			if (feedback) {
				foundStep.feedback = feedback
			}


		},
		ADD_SKILL: (state, newSkill) => state.skills.push(newSkill),
		REMOVE_SKILL: (state, id) => state.skills = state.skills.filter(skill => skill.id !== id),
		SET_SKILL_STATUS: (state, { stepId, newStatus, daysUntilDeadline, feedback, endDate }) => {
			const foundSkill = state.skills.find(skill => skill.id === stepId)
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
		}
	},
	actions: {}
}
