export default {
	namespaced: true,
	state: {
		messages: []
	},
	mutations: {
		ADD_MESSAGE: (state, message) => state.messages.unshift(message)
	}
}
