KISSY.add(function(S){
  return [
  arguments[1],
  "\n",
  {
    "type": "set",
    "equal": [
      {
        "type": "references",
        "id": "greatlakes",
        "leader": "$"
      },
      {
        "type": "array",
        "value": [
          {
            "type": "string",
            "value": "Superior",
            "isEval": true
          },
          {
            "type": "string",
            "value": "Michigan",
            "isEval": true
          },
          {
            "type": "string",
            "value": "Huron",
            "isEval": true
          },
          {
            "type": "string",
            "value": "Erie",
            "isEval": true
          },
          {
            "type": "string",
            "value": "Ontario",
            "isEval": true
          }
        ]
      }
    ]
  },
  "\n",
  {
    "type": "set",
    "equal": [
      {
        "type": "references",
        "id": "color",
        "leader": "$"
      },
      {
        "type": "string",
        "value": "blue",
        "isEval": true
      }
    ]
  },
  "\n<table>\n  ",
  {
    "type": "macro_call",
    "id": "tablerows",
    "args": [
      {
        "type": "references",
        "id": "color",
        "leader": "$"
      },
      {
        "type": "references",
        "id": "greatlakes",
        "leader": "$"
      }
    ]
  },
  "\n</table>\n",
  {
    "type": "set",
    "equal": [
      {
        "type": "references",
        "id": "parts",
        "leader": "$"
      },
      {
        "type": "array",
        "value": [
          {
            "type": "string",
            "value": "volva",
            "isEval": true
          },
          {
            "type": "string",
            "value": "stipe",
            "isEval": true
          },
          {
            "type": "string",
            "value": "annulus",
            "isEval": true
          },
          {
            "type": "string",
            "value": "gills",
            "isEval": true
          },
          {
            "type": "string",
            "value": "pileus",
            "isEval": true
          }
        ]
      }
    ]
  },
  "\n",
  {
    "type": "set",
    "equal": [
      {
        "type": "references",
        "id": "cellbgcol",
        "leader": "$"
      },
      {
        "type": "string",
        "value": "#CC00FF",
        "isEval": true
      }
    ]
  },
  "\n<table>\n  ",
  {
    "type": "macro_call",
    "id": "tablerows",
    "args": [
      {
        "type": "references",
        "id": "cellbgcol",
        "leader": "$"
      },
      {
        "type": "references",
        "id": "parts",
        "leader": "$"
      }
    ]
  },
  "\n</table>\n"
];
}, {
  requires: ["web/macro"]
});
