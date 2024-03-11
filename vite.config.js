import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy';

export default ({ mode }) => {

  return defineConfig({
    plugins: [react(), legacy({
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    })],
  });
}
