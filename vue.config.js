const path = require('path')

module.exports = {
	chainWebpack: config => {
		config.resolve.alias
			.set('Views', path.resolve(__dirname, './src/views'))
			.set('Components', path.resolve(__dirname, './src/components'))
			.set('Models', path.resolve(__dirname, './src/models'))
	},
}
