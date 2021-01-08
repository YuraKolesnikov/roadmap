import StatusModel from 'Models/StatusModel';

const actions = {
	add: '%actionDate%: %author% added a new step: "%skillName%"',
	remove: '%actionDate%: %author% removed step "%skillName%"',
	statusChange: '%actionDate%: %author% has changed step "%skillName%" status from "%oldStatus%" to "%newStatus%"',
	feedback: '%actionDate%: %author% gave a feedback: %feedback%'
}

const payloadExample = {
	author: 'Yura Kolesnikov',
	action: 'add',
	actionDate: new Date().toLocaleDateString('ru-RU'),
	data: {
		skillName: 'HTML Basics',
		oldStatus: 'New', /* or numbers */
		newStatus: 'In progress'
	}
}

function Message ({ action, author, actionDate, data }) {
	let result = actions[action].replace('%author%', author).replace('%skillName%', data.skillName).replace('%actionDate%', actionDate)

	if (action === 'statusChange') {
		result = result.replace('%oldStatus%', StatusModel.ID_TO_DATA[data.oldStatus].title).replace('%newStatus%', StatusModel.ID_TO_DATA[data.newStatus].title)
	} else if (action === 'feedback') {
		result = result.replace('%feedback%', data.feedback)
	}

	return result
}

export default Message
