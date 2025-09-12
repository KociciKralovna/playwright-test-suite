import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**vitest/**/*.spec.ts'],
    globals: true,                    
    environment: 'node',              
    hookTimeout: 30000,
    testTimeout: 30000,
    reporters: ['default']            
  }
});