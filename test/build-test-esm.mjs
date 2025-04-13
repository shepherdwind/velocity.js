/**
 * This script tests that the built package can be imported correctly
 * in ESM environment.
 */

import * as velocityjs from '../dist/esm/index.mjs';

try {
  console.log('✅ ESM import successful');

  // Basic functionality test
  const template = 'Hello $name!';
  const result = velocityjs.render(template, { name: 'World' });

  if (result === 'Hello World!') {
    console.log('✅ ESM functionality test passed');
    console.log('✅ All ESM build tests passed!');
  } else {
    console.error('❌ ESM functionality test failed');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ ESM functionality test failed:', error);
  process.exit(1);
} 