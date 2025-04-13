/**
 * This script tests that the built package can be imported correctly
 * in CommonJS environment.
 */

// Test CommonJS import
try {
  const velocityjs = require('../dist/cjs/index.cjs');
  console.log('✅ CommonJS import successful');

  // Basic functionality test
  const template = 'Hello $name!';
  const result = velocityjs.render(template, { name: 'World' });

  if (result === 'Hello World!') {
    console.log('✅ CommonJS functionality test passed');
    console.log('✅ All build tests passed!');
  } else {
    console.error('❌ CommonJS functionality test failed');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ CommonJS import failed:', error);
  process.exit(1);
}
