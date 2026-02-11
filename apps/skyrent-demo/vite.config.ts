import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const alias: Record<string, string> = {
    '@': path.resolve(__dirname, './src'),
  };

  if (mode === 'test') {
    alias['@skyrent/identity-sdk'] = path.resolve(
      __dirname,
      '../../packages/identity-sdk/src/index.ts'
    );
  }

  return {
    plugins: [react()],
    resolve: {
      alias,
    },
  };
});
