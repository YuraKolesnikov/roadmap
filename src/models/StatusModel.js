const StatusModel = {
	NEW: {
		id: 1,
		title: 'New'
	},

	IN_PROGRESS: {
		id: 2,
		title: 'In progress'
	},

	TESTING: {
		id: 3,
		title: 'Testing'
	},

	PASSED: {
		id: 4,
		title: 'Passed'
	},

	FAILED: {
		id: 5,
		title: 'Failed'
	}
}

StatusModel.LIST = [
	StatusModel.NEW,
	StatusModel.IN_PROGRESS,
	StatusModel.TESTING,
	StatusModel.PASSED,
	StatusModel.FAILED
]

StatusModel.ID_TO_DATA = {
	[StatusModel.NEW.id]: StatusModel.NEW,
	[StatusModel.IN_PROGRESS.id]: StatusModel.IN_PROGRESS,
	[StatusModel.TESTING.id]: StatusModel.TESTING,
	[StatusModel.PASSED.id]: StatusModel.PASSED,
	[StatusModel.FAILED.id]: StatusModel.FAILED
}

export default StatusModel
