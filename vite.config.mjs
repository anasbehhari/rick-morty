import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load env file based on `mode` (e.g., 'development', 'production')
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.mjs',
    },
    // Optionally, use environment variables in your Vite configuration
    server: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT) : 3000,
    },
    define: {
      'process.env': env, // Make env variables available in the client-side code
    },
  });
};
