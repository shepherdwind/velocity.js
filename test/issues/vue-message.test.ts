import { render } from '../../src';
import assert from 'assert';

describe('Vue $message test', () => {
  it('should handle Vue $message correctly', () => {
    const template: string = `vm.$message({"message":"成功"})`;

    const result = render(template, {});
    assert.equal(result.includes('vm.$message'), true);
  });
});
