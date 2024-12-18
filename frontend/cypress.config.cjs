

/* eslint-disable */
// import { defineConfig } from 'cypress';

// import { defineConfig } from 'cypress';
// import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
// import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
// import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
	addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const {
	createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { defineConfig } = require('cypress');
// import { defineConfig } from 'cypress';

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:4000',
		async setupNodeEvents(on, config) {
			const bundler = createBundler({
				plugins: [createEsbuildPlugin(config)],
			});
			on('file:preprocessor', bundler);

			await addCucumberPreprocessorPlugin(on, config);

			return config;
		},
		specPattern: [
			// E2E-filer Cypress letar efter som standard
			'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
			// Tillägg för Cucumber
			'cypress/e2e/**/*.feature',
		],
	},

	component: {
		devServer: {
			framework: 'next',
			bundler: 'webpack',
		},
	},
});
// framework: 'react',
