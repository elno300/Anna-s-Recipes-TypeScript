module.exports = {
	e2e: {
		baseUrl: 'http://localhost:4000',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
	component: {
		devServer: {
			framework: 'react',
			bundler: 'webpack',
		},
	},
};
