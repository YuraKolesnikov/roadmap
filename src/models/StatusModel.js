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
	[StatusModel.NEW]: StatusModel.NEW.id,
	[StatusModel.IN_PROGRESS]: StatusModel.IN_PROGRESS.id,
	[StatusModel.TESTING]: StatusModel.TESTING.id,
	[StatusModel.PASSED]: StatusModel.PASSED,
	[StatusModel.FAILED]: StatusModel.FAILED
}

export default StatusModel
