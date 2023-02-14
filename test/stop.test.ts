import { render } from '../src';
describe('stop', function () {
  it('should support #stop', function () {
    const str = "hello #stop('hello') world";
    expect(render(str).trim()).toEqual('hello');
  });

  it('should support #stop in loop', function () {
    const str = `
      <ul>
        #foreach( $product in $items )
        #if ($product == 'world') #stop() #end
        <li>$product</li>
        #end
      </ul>
    `;
    const ret = render(str, { items: ['hello', 'world'] }).replace(/\s+/g, '');
    expect(ret).toMatchInlineSnapshot('"<ul><li>hello</li>"');
  });

  it('should support #stop in #parse', function () {
    const str = `
      <p>hello</p>
      #parse($a)
      this should stop output
    `;
    const ret = render(
      str,
      {
        a: `
        this_is_a
        #stop('stop a')
        this is stop end
      `,
      },
      {
        parse: function (template) {
          return this.eval(template);
        },
      }
    ).replace(/\s+/g, '');
    expect(ret).toMatchInlineSnapshot('"<p>hello</p>this_is_a"');
  });
});
