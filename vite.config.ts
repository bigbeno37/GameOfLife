import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	test: {
		environment: 'jsdom'
	},
	base: '/GameOfLife/',
	build: {
		outDir: 'docs'
	}
});
