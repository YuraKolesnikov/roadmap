const UserModel = {
	USER: {
		id: 1,
		title: 'User'
	},

	MENTOR: {
		id: 2,
		title: 'Mentor'
	},

	ADMIN: {
		id: 3,
		title: 'Admin'
	}
}

UserModel.LIST = [
	UserModel.USER,
	UserModel.MENTOR,
	UserModel.ADMIN
]

UserModel.ID_TO_DATA = {
	[UserModel.USER.id]: UserModel.USER,
	[UserModel.MENTOR.id]: UserModel.MENTOR,
	[UserModel.ADMIN.id]: UserModel.ADMIN
}

export default UserModel
