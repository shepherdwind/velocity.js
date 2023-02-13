import assert from 'assert';
import { render } from '../src/velocity';
describe('Loops', () => {
  it('#foreach', () => {
    const vm = '#foreach( $product in $allProducts )<li>$product</li>#end';
    const data = { allProducts: ['book', 'phone'] };
    assert.equal('<li>book</li><li>phone</li>', render(vm, data));
  });

  it('#foreach with map', () => {
    const vm = '#foreach($key in $products) name => $products.name #end';
    const data = { products: { name: 'hanwen' } };
    assert.equal(' name => hanwen ', render(vm, data));
  });

  it('#foreach with map hasNext', () => {
    const vm =
      '#foreach($product in $products)$product.name#if($foreach.hasNext),#end#end';
    const data = {
      products: {
        product1: { name: 'hanwen1' },
        product2: { name: 'hanwen2' },
        product3: { name: 'hanwen3' },
      },
    };
    assert.equal('hanwen1,hanwen2,hanwen3', render(vm, data));
  });

  it('#foreach with map keySet', () => {
    const vm =
      '#foreach($key in $products.keySet())' +
      ' $key => $products.get($key) #end';
    const data = { products: { name: 'hanwen' } };
    assert.equal(' name => hanwen ', render(vm, data));
  });

  it('#foreach with nest foreach', () => {
    let vm =
      '#foreach($i in [1..2])${velocityCount}' +
      '#foreach($j in [2..3])${velocityCount}#end#end';
    assert.equal('112212', render(vm));
    vm = '#foreach($i in [5..2])$i#end';
    assert.equal('5432', render(vm));
  });

  it('#foreach with nest non-empty foreach', () => {
    const vm =
      '#foreach($i in [1..2])' +
      '[#foreach($j in [1..2])$j#if($foreach.hasNext),#end#end]' +
      '#if($foreach.hasNext),#end#end';
    assert.equal('[1,2],[1,2]', render(vm));
  });

  it('#foreach with nest empty foreach', () => {
    const vm =
      '#foreach($i in [1..2])' +
      '[#foreach($j in [])$j#if($foreach.hasNext),#end#end]' +
      '#if($foreach.hasNext),#end#end';
    assert.equal('[],[]', render(vm));
  });

  it('#foreach with map entrySet', () => {
    const vm =
      '' +
      '#set($js_file = {\n' +
      '  "js_arale":"build/js/arale.js?t=20110608",\n' +
      '  "js_ma_template":"build/js/ma/template.js?t=20110608",\n' +
      '  "js_pa_pa":"build/js/pa/pa.js?t=20110608",\n' +
      '  "js_swiff":"build/js/app/swiff.js?t=20110608",\n' +
      '  "js_alieditControl":"build/js/pa/alieditcontrol-update.js?"\n' +
      '})\n' +
      '#foreach($_item in $js_file.entrySet())' +
      '$_item.key = $staticServer.getURI("/${_item.value}")\n' +
      '#end';

    const ret =
      'js_arale = /path/build/js/arale.js?t=20110608\n' +
      'js_ma_template = /path/build/js/ma/template.js?t=20110608\n' +
      'js_pa_pa = /path/build/js/pa/pa.js?t=20110608\n' +
      'js_swiff = /path/build/js/app/swiff.js?t=20110608\n' +
      'js_alieditControl = /path/build/js/pa/alieditcontrol-update.js?\n';

    const data = {
      staticServer: {
        getURI: function (url) {
          return '/path' + url;
        },
      },
    };

    assert.equal(ret.trim(), render(vm, data).trim());
  });

  it('#foreach with #macro, $velocityCount should work, #25', () => {
    const vm =
      '#macro(local) #end ' +
      '#foreach ($one in [1,2,4]) #local() $velocityCount #end';
    const ret = render(vm).replace(/\s+/g, '');
    assert.equal('123', ret);
  });

  it('#break', () => {
    const vm =
      '#foreach($num in [1..6])' +
      ' #if($foreach.count > 3) #break #end $num #end';
    assert.equal('  1   2   3     4 ', render(vm));
  });

  it('#break for map', () => {
    const vm =
      '#foreach($item in $map)' +
      ' #if($foreach.count > 2) #break #end $item #end';
    const data = { map: { item1: '1', item2: '2', item3: '3', item4: '4' } };
    assert.equal('  1   2     3 ', render(vm, data));
  });

  it('foreach for null', () => {
    const vm = '#foreach($num in $bar) #end';
    assert.equal('', render(vm));
  });

  it('support #foreach(${itemData} in ${defaultData})', () => {
    const vm = `#set($allProducts = [1, 2, 3])
        #foreach(\${product} in \${allProducts}) <li>$product</li> #end`;
    const html = render(vm).replace(/\s+/g, '');
    expect(html).toMatchInlineSnapshot('"<li>1</li><li>2</li><li>3</li>"');
  });

  it('issue 100', () => {
    const vm = `
      #set($records = [[1], [2], [3]])
      #foreach($rec in $records)
        #set($match = true)
        #foreach($val in $rec)
            #if($val % 2 != 0)
                #set($match = false)
                #break
            #end
        #end
        #if($match == true)
            matched: "$rec"
        #end
      #end
    `;
    const context = {
      records: [[1], [2], [3]],
    };
    const ret = render(vm, context);
    expect(ret.replace(/\s+/g, '')).toEqual('matched:"[2]"');
  });

  it('set ok, fix #129', () => {
    const context = {
      records: [{ ID: '1' }, { ID: '2' }, { ID: '3' }],
    };

    const template1 = `
    #foreach($item in $records)
        #set( $item.key = $item.ID )
    #end
    $records`;
    const template2 = `
    #foreach($x in $records)
        #set( $item = $x )
        #set( $item.key = $item.ID )
    #end
    $records`;

    const ret = render(template1, context);
    expect(ret.trim()).toEqual('[{ID=1, key=1}, {ID=2, key=2}, {ID=3, key=3}]');
    const ret2 = render(template2, context);
    expect(ret2.trim()).toEqual('[{ID=1, key=1}, {ID=2, key=2}, {ID=3, key=3}]');
  });
});
