import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
	{
		// Ignore irrelevant directories globally
		ignores: ['node_modules/**', 'dist/**', 'build/**'],
	},
	{
		// Frontend (React and JSX) configuration
		files: ['public/**/*.{ts,tsx}'], // Adjust based on frontend file location
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser, // Use browser globals
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				sourceType: 'module',
			},
		},
		plugins: {
			react,
		},
		rules: {
			...js.configs.recommended.rules, // Base JS rules
			'react/jsx-uses-react': 'off', // Not needed for React 17+
			'react/jsx-uses-vars': 'error', // Prevent false unused variable errors
			...react.configs.recommended.rules, // React-specific rules
		},
	},
	{
		// Backend (Node.js) configuration
		files: ['server/**/*.{ts,js}'], // Adjust based on backend file location
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.node, // Use Node.js globals
			parserOptions: {
				sourceType: 'module',
			},
		},
		rules: {
			...js.configs.recommended.rules, // Base JS rules
			'no-console': 'off', // Allow console.logs in backend
		},
	},
];
