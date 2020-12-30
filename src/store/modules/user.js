import StatusModel from '@/models/StatusModel';

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
		]
	},
	mutations: {
		SET_STEP_STATUS: (state, { planId, stepId, newStatus, startDate }) => {
			const foundPlan = state.plans.find(plan => plan.id === planId)
			const foundStep = foundPlan.steps.find(step => step.id === stepId)
			if (foundStep.status === StatusModel.NEW.id) {
				const startDate = new Date()
				const endDate = new Date(startDate.setDate(startDate.getDate() + foundStep.daysUntilDeadline))
				foundStep.startDate = startDate.toLocaleDateString('ru-RU')
				foundStep.endDate = endDate.toLocaleDateString('ru-RU')
			}
			foundStep.status = newStatus
		}
	},
	actions: {}
}
