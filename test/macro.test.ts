import assert from 'assert';
import { render } from '../src';

describe('macro_body', () => {
  it('#@foo()', () => {
    const vm = '#macro( d ) <tr><td>$!bodyContent</td></tr> #end #@d()Hello!#end';
    assert('<tr><td>Hello!</td></tr>', render(vm, {}).trim());
  });
  it('#@ with template', () => {
    const vm = '#macro( d ) <tr><td>$!bodyContent</td></tr> #end #@d()Hello $nick!#end';
    assert('<tr><td>Hello foo!</td></tr>', render(vm, { nick: 'foo' }).trim());
  });
});
