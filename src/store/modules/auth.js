import UserModel from 'Models/UserModel';

export default {
	namespaced: true,
	state: {
		isLoading: false, /* Для всяких анимаций */
		isLoggedIn: false,
		userStatus: null
	},
	mutations: {
		SET_LOGGED_IN_STATUS: (state, newStatus) => state.isLoggedIn = newStatus,
		SET_USER_STATUS: (state, status) => state.userStatus = status
	},
	actions: {
		LOG_IN: ({ commit }, payload) => {
			return new Promise(((resolve, reject) => {
				/* TODO: Перенести проверку в компонент Auth.vue когда будет сделан бэк */
				if (!payload.username || !payload.password) {
					reject('Missing username/password')
				}
				/* TODO: Auth запрос на backend */
				/* Если ошибка, тоже reject */

				/* TEMP CODE: */
				if (payload.username === 'admin' && payload.password === 'admin') {
					commit('SET_USER_STATUS', UserModel.ADMIN.id)
				} else if (payload.username === 'mentor' && payload.password === 'mentor') {
					commit('SET_USER_STATUS', UserModel.MENTOR.id)
				} else {
					commit('SET_USER_STATUS', UserModel.USER.id)
				}

				commit('SET_LOGGED_IN_STATUS', true)
				resolve()
			}))
		}
	}
}
