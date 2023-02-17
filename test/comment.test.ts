import { render } from '../src';

describe('comment render', function () {
  it('fix #66', () => {
    expect(render('##')).toEqual('');
  });
});
