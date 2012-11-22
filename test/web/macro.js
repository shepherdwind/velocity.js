KISSY.add(function(S){
  return [
  {
    "type": "macro",
    "id": "tablerows",
    "args": [
      {
        "type": "references",
        "id": "color",
        "leader": "$"
      },
      {
        "type": "references",
        "id": "somelist",
        "leader": "$"
      }
    ]
  },
  "\n  ",
  {
    "type": "foreach",
    "to": "something",
    "from": {
      "type": "references",
      "id": "somelist",
      "leader": "$"
    }
  },
  "\n    <tr><td bgcolor=",
  {
    "type": "references",
    "id": "color",
    "leader": "$"
  },
  ">",
  {
    "type": "references",
    "id": "something",
    "leader": "$"
  },
  "<",
  "/td></tr>\n  ",
  {
    "type": "end"
  },
  "\n",
  {
    "type": "end"
  },
  "\n"
];
}, {
  requires: []
});
