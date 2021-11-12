const utils = require('amplify-appsync-simulator/lib/velocity/util');
const mapper = require('amplify-appsync-simulator/lib/velocity/value-mapper/mapper');
const assert = require("assert");
const Velocity = require('../src/velocity');

const { Compile, parse } = Velocity;

function createVtlContext(args) {
  const util = utils.create([], new Date(Date.now()), Object())
  const context = {
    args,
    arguments: args
  }
  return {
    util,
    utils: util,
    ctx: context,
    context
  }
}

describe('test/issues.test.js', () => {
  it('#140', () => {
    const ast = parse(`
      #set( $keyFields = ["id"] )
      #foreach( $entry in $util.map.copyAndRemoveAllKeys($ctx.args.input, $keyFields).entrySet() )
        $entry.toJSON()
      #end
    `);

    const compiler = new Compile(ast, {
      valueMapper: mapper.map,
      escape: false
    })
    const args = {
      input: mapper.map({
        id: '000',
        timestamp: '2021-12-01T08:00:00.000Z',
      })
    }
    const context = createVtlContext(args);
    const result = compiler.render(context);
    // console.log(result);
    assert.equal(result.trim(), '{key=timestamp, value=2021-12-01T08:00:00.000Z}');
  });
});