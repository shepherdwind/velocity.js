import { render } from '../src/velocity';

describe('comment render', function() {
  it('fix #66', () => {
    expect(render('##')).toEqual('');
  });
});
