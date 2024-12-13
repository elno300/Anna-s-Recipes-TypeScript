// import { defineConfig } from 'cypress';

// /* eslint-disable */

// const { defineConfig } = require('cypress');

// const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
// const {
// 	addCucumberPreprocessorPlugin,
// } = require('@badeball/cypress-cucumber-preprocessor');
// const {
// 	createEsbuildPlugin,
// } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
// const { defineConfig } = require('cypress');

// module.exports = defineConfig({
// 	e2e: {
// 		baseUrl: 'http://localhost:4000',
// 		async setupNodeEvents(on, config) {
// 			const bundler = createBundler({
// 				plugins: [createEsbuildPlugin(config)],
// 			});
// 			on('file:preprocessor', bundler);

// 			await addCucumberPreprocessorPlugin(on, config);

// 			return config;
// 		},
// 		specPattern: [
// 			// E2E-filer Cypress letar efter som standard
// 			'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
// 			// Tillägg för Cucumber
// 			'cypress/e2e/**/*.feature',
// 		],
// 	},
// 	component: {
// 		devServer: {
// 			framework: 'next',
// 			bundler: 'webpack',
// 		},
// 	},
// });

/* eslint-disable */

// import { defineConfig } from 'cypress';
// import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
// import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
// import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

// export default defineConfig({
// 	e2e: {
// 		baseUrl: 'http://localhost:4000',
// 		async setupNodeEvents(on, config) {
// 			// Skapa en ESBuild-bundler med rätt plugins
// 			const bundler = createBundler({
// 				plugins: [createEsbuildPlugin(config)],
// 			});
// 			// Registrera bundlern som filpreprocessor
// 			on('file:preprocessor', bundler);

// 			// Lägg till Cucumber-pluginet
// 			await addCucumberPreprocessorPlugin(on, config);

// 			// Returnera den uppdaterade konfigurationen
// 			return config;
// 		},
// 		// Mönster för att hitta testfiler
// 		specPattern: [
// 			'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Standard Cypress-mönster
// 			'cypress/e2e/**/*.feature', // Stöd för Cucumber-filer
// 		],
// 	},
// 	component: {
// 		devServer: {
// 			framework: 'next', // Framework är Next.js
// 			bundler: 'webpack', // Bundler är Webpack
// 		},
// 	},
// });

/* eslint-disable */
// import { defineConfig } from 'cypress';

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
