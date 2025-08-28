import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { configDefaults } from 'vitest/config'; // ✅ tells TS about "test" option

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // optional (for RTL)
    exclude: [...configDefaults.exclude], // optional
  },
});
