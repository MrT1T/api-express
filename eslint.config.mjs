import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default defineConfig(
	eslint.configs.recommended,
	tseslint.configs.recommended,
	prettier,
	{
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			'prettier/prettier': 'error',
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
		},
	},
	// Override default ignores of eslint-config-next.
	globalIgnores(['dist/**', 'node_modules/**']),
);
