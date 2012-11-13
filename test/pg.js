module.exports = { 
  tmpUrl: 'baseList.htm?baseName=$!baseName&state=$!state',
  pg: { 
    Page: 10,
    LastPage: 20,
    PreviousPage: 9,
    Slider: [1, 2, 3, '...', 4, 5],
    isDisabledPage: function(num){
      return num === 3 || num === '...';
    },
    NextPage: 11 
  },
  slider: '$pg.getSlider()',
  p: 'string' 
};
