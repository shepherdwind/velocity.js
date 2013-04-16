KISSY.add(function(S){
  return [
  "<div class=\"m-items\">\r\n  ",
  [
    {
      "type": "if",
      "condition": {
        "type": "references",
        "id": "isSameItemOn",
        "leader": "$"
      }
    },
    "\r\n  <div class=\"same-item-on\">\r\n  ",
    {
      "type": "else"
    },
    "\r\n  </div>\r\n  "
  ],
  "\r\n\r\n  ",
  [
    {
      "type": "if",
      "condition": {
        "type": "math",
        "expression": [
          {
            "type": "references",
            "id": "itemsCnt",
            "leader": "$"
          },
          {
            "type": "integer",
            "value": "0"
          }
        ],
        "operator": ">"
      }
    },
    "\r\n    ",
    [
      {
        "type": "if",
        "condition": {
          "type": "references",
          "id": "isGridStyle",
          "leader": "$"
        }
      },
      "\r\n    <ul class=\"items grid clearfix\">\r\n      ",
      [
        {
          "type": "foreach",
          "to": "item",
          "from": {
            "type": "references",
            "id": "items",
            "leader": "$"
          }
        },
        "\r\n        ",
        [
          {
            "type": "if",
            "condition": {
              "type": "math",
              "expression": [
                {
                  "type": "math",
                  "expression": [
                    {
                      "type": "references",
                      "id": "foreach",
                      "path": [
                        {
                          "type": "property",
                          "id": "count"
                        }
                      ],
                      "leader": "$"
                    },
                    {
                      "type": "integer",
                      "value": "4"
                    }
                  ],
                  "operator": "%"
                },
                {
                  "type": "integer",
                  "value": "3"
                }
              ],
              "operator": "=="
            }
          },
          "\r\n          <li class=\"item last\">\r\n        ",
          {
            "type": "else"
          },
          "\r\n          <li class=\"item\">\r\n        "
        ],
        "\r\n        <div class=\"img\">\r\n          <table class=\"center\">\r\n            <tr><td>\r\n              <a href=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "href"
            }
          ],
          "leader": "$"
        },
        "\"",
        " target=\"_blank\"><img src=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "image"
            }
          ],
          "leader": "$"
        },
        "\"",
        " /></a>\r\n            </td></tr>\r\n          </table>\r\n          ",
        [
          {
            "type": "if",
            "condition": {
              "type": "references",
              "id": "item",
              "path": [
                {
                  "type": "property",
                  "id": "sameItemInfo"
                }
              ],
              "leader": "$"
            }
          },
          "\r\n          <a class=\"same-item\" href=\"",
          {
            "type": "references",
            "id": "item",
            "path": [
              {
                "type": "property",
                "id": "sameItemInfo"
              },
              {
                "type": "property",
                "id": "url"
              }
            ],
            "leader": "$"
          },
          "\"",
          " target=\"_blank\"><span class=\"num\">",
          {
            "type": "references",
            "id": "item",
            "path": [
              {
                "type": "property",
                "id": "sameItemInfo"
              },
              {
                "type": "property",
                "id": "count"
              }
            ],
            "leader": "$"
          },
          "<",
          "/span>\u4ef6\u540c\u6b3e</a>\r\n          "
        ],
        "\r\n        </div>\r\n        <div class=\"info\">\r\n          <ul class=\"clearfix\">\r\n            <li class=\"price\">\r\n              <span class=\"g_price\">\r\n                <span>&yen;</span><strong>",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "currentPrice"
            }
          ],
          "leader": "$"
        },
        "<",
        "/strong>\r\n              </span>\r\n              <span class=\"g_price g_price-original\">\r\n                <span>&yen;</span><strong>",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "price"
            }
          ],
          "leader": "$"
        },
        "<",
        "/strong>\r\n              </span>\r\n            </li>\r\n            <li class=\"quantity\">\r\n              ",
        [
          {
            "type": "if",
            "condition": {
              "type": "math",
              "expression": [
                {
                  "type": "references",
                  "id": "item",
                  "path": [
                    {
                      "type": "property",
                      "id": "tradeNum"
                    }
                  ],
                  "leader": "$"
                },
                {
                  "type": "string",
                  "value": "0"
                }
              ],
              "operator": "!="
            }
          },
          "\r\n                ",
          [
            {
              "type": "if",
              "condition": {
                "type": "references",
                "id": "item",
                "path": [
                  {
                    "type": "property",
                    "id": "formatedNum"
                  }
                ],
                "leader": "$"
              }
            },
            "\r\n                  <span title=\"\u9500\u91cf: ",
            {
              "type": "references",
              "id": "item",
              "path": [
                {
                  "type": "property",
                  "id": "tradeNum"
                }
              ],
              "leader": "$"
            },
            "\"",
            ">\r\n                ",
            {
              "type": "else"
            },
            "\r\n                  <span>\r\n                "
          ],
          "\r\n                    <span>\u9500\u91cf\uff1a</span>\r\n                    ",
          [
            {
              "type": "if",
              "condition": {
                "type": "references",
                "id": "item",
                "path": [
                  {
                    "type": "property",
                    "id": "formatedNum"
                  }
                ],
                "leader": "$"
              }
            },
            "\r\n                    <span class=\"num\">",
            {
              "type": "references",
              "id": "item",
              "path": [
                {
                  "type": "property",
                  "id": "formatedNum"
                }
              ],
              "leader": "$"
            },
            "<",
            "/span>\r\n                    ",
            {
              "type": "else"
            },
            "\r\n                    <span class=\"num\">",
            {
              "type": "references",
              "id": "item",
              "path": [
                {
                  "type": "property",
                  "id": "tradeNum"
                }
              ],
              "leader": "$"
            },
            "<",
            "/span>\r\n                    "
          ],
          "\r\n                </span>\r\n              "
        ],
        "\r\n            </li>\r\n            <li class=\"title\">\r\n              <a href=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "href"
            }
          ],
          "leader": "$"
        },
        "\"",
        " title=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "tip"
            }
          ],
          "leader": "$"
        },
        "\"",
        " target=\"_blank\">",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "title"
            }
          ],
          "leader": "$"
        },
        "<",
        "b class=\"mask\"></b></a>\r\n            </li>\r\n            <li class=\"wangwang\">\r\n              <a class=\"nick\" data-sellerId=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "sellerId"
            }
          ],
          "leader": "$"
        },
        "\"",
        " href=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "storeLink"
            }
          ],
          "leader": "$"
        },
        "\"",
        " target=\"_blank\">",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "nick"
            }
          ],
          "leader": "$"
        },
        "<",
        "b class=\"mask\"></b></a>\r\n              <span class=\"J_WangWang\" data-icon=\"small\" data-nick=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "ncik"
            }
          ],
          "leader": "$"
        },
        "\"",
        " data-tnick=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "nick"
            }
          ],
          "leader": "$"
        },
        "\"",
        " data-encode=\"true\" data-display=\"inline\" data-item=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "sellerId"
            }
          ],
          "leader": "$"
        },
        "\"",
        "></span>\r\n            </li>\r\n            <li class=\"post\">\r\n              <span class=\"icon\">\u90ae</span>\r\n              <span class=\"g_price\">\r\n                <span>&yen;</span><strong>",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "ship"
            }
          ],
          "leader": "$"
        },
        "<",
        "/strong>\r\n              </span>\r\n              <span class=\"bar\">|</span>\r\n              <span class=\"from\">",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "loc"
            }
          ],
          "leader": "$"
        },
        "<",
        "/span>\r\n            </li>\r\n          </ul>\r\n          <div class=\"m-icons clearfix\">\r\n            <a class=\"icon icon-tmall\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <b class=\"icon icon-bar\"></b>\r\n            <a class=\"icon icon-photograph\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-lp\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-xinpin\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-ppsq\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-hitao\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-zifa\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-shopping\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-global\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-credit\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-discount\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-cod\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-welfare\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-love\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-tao1site\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-koubei\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-quality\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-as-fact\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-thirdqc\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-sevenday-return \" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-jia1-pei3\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-thunder-delivery\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-thirtyday-repair\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-you\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-detail\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n          </div>\r\n        </div>\r\n      </li>\r\n      "
      ],
      "\r\n    </ul>\r\n    ",
      {
        "type": "else"
      },
      "\r\n    <ul class=\"items list\">\r\n      ",
      [
        {
          "type": "foreach",
          "to": "item",
          "from": {
            "type": "references",
            "id": "items",
            "leader": "$"
          }
        },
        "\r\n      <li class=\"item clearfix\">\r\n        <div class=\"col col-1\">\r\n          <table class=\"center\" data-itemId=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "itemId"
            }
          ],
          "leader": "$"
        },
        "\"",
        " data-sellerId=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "sellerId"
            }
          ],
          "leader": "$"
        },
        "\"",
        ">\r\n            <tr><td>\r\n              <a href=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "href"
            }
          ],
          "leader": "$"
        },
        "\"",
        " target=\"_blank\"><img src=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "image"
            }
          ],
          "leader": "$"
        },
        "\"",
        " alt=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "tip"
            }
          ],
          "leader": "$"
        },
        "\"",
        " /></a>\r\n            </td></tr>\r\n          </table>\r\n        </div>\r\n        <div class=\"col col-2\">\r\n          <div class=\"title\">\r\n            <a href=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "href"
            }
          ],
          "leader": "$"
        },
        "\"",
        " title=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "tip"
            }
          ],
          "leader": "$"
        },
        "\"",
        " target=\"_blank\">",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "title"
            }
          ],
          "leader": "$"
        },
        "<",
        "b class=\"mask\"></b></a>\r\n          </div>\r\n          <div class=\"wangwang clearfix\">\r\n            <a class=\"nick\" data-sellerId=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "sellerId"
            }
          ],
          "leader": "$"
        },
        "\"",
        " href=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "storeLink"
            }
          ],
          "leader": "$"
        },
        "\"",
        " target=\"_blank\">",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "nick"
            }
          ],
          "leader": "$"
        },
        "<",
        "b class=\"mask\"></b></a>\r\n            <span class=\"J_WangWang\" data-icon=\"small\" data-nick=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "nick"
            }
          ],
          "leader": "$"
        },
        "\"",
        " data-tnick=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "nick"
            }
          ],
          "leader": "$"
        },
        "\"",
        " data-encode=\"true\" data-display=\"inline\" data-item=\"",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "sellerId"
            }
          ],
          "leader": "$"
        },
        "\"",
        "></span>\r\n            ",
        [
          {
            "type": "if",
            "condition": {
              "type": "references",
              "id": "item",
              "path": [
                {
                  "type": "property",
                  "id": "sameItemInfo"
                }
              ],
              "leader": "$"
            }
          },
          "\r\n            <a class=\"same-item\" href=\"",
          {
            "type": "references",
            "id": "item",
            "path": [
              {
                "type": "property",
                "id": "sameItemInfo"
              },
              {
                "type": "property",
                "id": "url"
              }
            ],
            "leader": "$"
          },
          " ",
          "\" target=\"_blank\"><span class=\"num\">",
          {
            "type": "references",
            "id": "item",
            "path": [
              {
                "type": "property",
                "id": "sameItemInfo"
              },
              {
                "type": "property",
                "id": "count"
              }
            ],
            "leader": "$"
          },
          " ",
          "</span>\u4ef6\u540c\u6b3e</a>\r\n            "
        ],
        "\r\n          </div>\r\n          <div class=\"m-icons clearfix\">\r\n            <a class=\"icon icon-tmall\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <b class=\"icon icon-bar\"></b>\r\n            <a class=\"icon icon-photograph\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-lp\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-xinpin\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-ppsq\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-hitao\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-zifa\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-shopping\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-global\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-credit\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-discount\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-cod\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-welfare\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-love\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-tao1site\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-koubei\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-quality\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-as-fact\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-thirdqc\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-sevenday-return \" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-jia1-pei3\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-thunder-delivery\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-thirtyday-repair\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-you\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n            <a class=\"icon icon-detail\" href=\"",
        "#",
        "\" target=\"_blank\"></a>\r\n          </div>\r\n        </div>\r\n        <div class=\"col col-3\">\r\n          <p class=\"price\">\r\n            <span class=\"g_price\">\r\n              <span>&yen;</span><strong>",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "currentPrice"
            }
          ],
          "leader": "$"
        },
        "<",
        "/strong>\r\n            </span>\r\n          </p>\r\n          <p class=\"orig-price\">\r\n            <span class=\"g_price g_price-original\">\r\n              <span>&yen;</span><strong>",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "price"
            }
          ],
          "leader": "$"
        },
        "<",
        "/strong>\r\n            </span>\r\n          </p>\r\n          <p class=\"from\">\r\n            <span class=\"from\">",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "loc"
            }
          ],
          "leader": "$"
        },
        "<",
        "/span>\r\n          </p>\r\n          <p class=\"post\">\r\n            <span class=\"icon\">\u90ae</span>\r\n            <span class=\"g_price\">\r\n              <span>&yen;</span><strong>",
        {
          "type": "references",
          "id": "item",
          "path": [
            {
              "type": "property",
              "id": "ship"
            }
          ],
          "leader": "$"
        },
        "<",
        "/strong>\r\n            </span>\r\n          </p>\r\n        </div>\r\n        <div class=\"col col-4\">\r\n          <p class=\"quantity\">\r\n              ",
        [
          {
            "type": "if",
            "condition": {
              "type": "math",
              "expression": [
                {
                  "type": "references",
                  "id": "item",
                  "path": [
                    {
                      "type": "property",
                      "id": "tradeNum"
                    }
                  ],
                  "leader": "$"
                },
                {
                  "type": "string",
                  "value": "0"
                }
              ],
              "operator": "!="
            }
          },
          "\r\n                ",
          [
            {
              "type": "if",
              "condition": {
                "type": "references",
                "id": "item",
                "path": [
                  {
                    "type": "property",
                    "id": "formatedNum"
                  }
                ],
                "leader": "$"
              }
            },
            "\r\n                  <span title=\"\u9500\u91cf: ",
            {
              "type": "references",
              "id": "item",
              "path": [
                {
                  "type": "property",
                  "id": "tradeNum"
                }
              ],
              "leader": "$"
            },
            "\"",
            ">\r\n                ",
            {
              "type": "else"
            },
            "\r\n                  <span>\r\n                "
          ],
          "\r\n                    <span>\u9500\u91cf\uff1a</span>\r\n                    ",
          [
            {
              "type": "if",
              "condition": {
                "type": "references",
                "id": "item",
                "path": [
                  {
                    "type": "property",
                    "id": "formatedNum"
                  }
                ],
                "leader": "$"
              }
            },
            "\r\n                    <span class=\"num\">",
            {
              "type": "references",
              "id": "item",
              "path": [
                {
                  "type": "property",
                  "id": "formatedNum"
                }
              ],
              "leader": "$"
            },
            "<",
            "/span>\r\n                    ",
            {
              "type": "else"
            },
            "\r\n                    <span class=\"num\">",
            {
              "type": "references",
              "id": "item",
              "path": [
                {
                  "type": "property",
                  "id": "tradeNum"
                }
              ],
              "leader": "$"
            },
            "<",
            "/span>\r\n                    "
          ],
          "\r\n                </span>\r\n              "
        ],
        "\r\n          </p>\r\n          <p class=\"comments\">\r\n            ",
        [
          {
            "type": "if",
            "condition": {
              "type": "math",
              "expression": [
                {
                  "type": "references",
                  "id": "item",
                  "path": [
                    {
                      "type": "property",
                      "id": "commend"
                    }
                  ],
                  "leader": "$"
                },
                {
                  "type": "string",
                  "value": "0"
                }
              ],
              "operator": "!="
            }
          },
          "\r\n              <a class=\"text\" href=\"",
          {
            "type": "references",
            "id": "item",
            "path": [
              {
                "type": "property",
                "id": "commendHref"
              }
            ],
            "leader": "$"
          },
          "\"",
          " target=\"_blank\">",
          {
            "type": "references",
            "id": "item",
            "path": [
              {
                "type": "property",
                "id": "commend"
              }
            ],
            "leader": "$"
          },
          "\u6761",
          "\u70b9\u8bc4</a>\r\n            "
        ],
        "\r\n          </p>\r\n        </div>\r\n        <div class=\"col col-5\">\r\n          ",
        [
          {
            "type": "if",
            "condition": {
              "type": "math",
              "expression": [
                {
                  "type": "math",
                  "expression": [
                    {
                      "type": "references",
                      "id": "item",
                      "path": [
                        {
                          "type": "property",
                          "id": "ratesum"
                        }
                      ],
                      "leader": "$"
                    },
                    {
                      "type": "math",
                      "expression": [
                        {
                          "type": "references",
                          "id": "item",
                          "path": [
                            {
                              "type": "property",
                              "id": "ratesum"
                            }
                          ],
                          "leader": "$"
                        },
                        {
                          "type": "string",
                          "value": "-1"
                        }
                      ],
                      "operator": "!="
                    }
                  ],
                  "operator": "&&"
                },
                {
                  "type": "references",
                  "id": "item",
                  "path": [
                    {
                      "type": "property",
                      "id": "ratesumImg"
                    }
                  ],
                  "leader": "$"
                }
              ],
              "operator": "&&"
            }
          },
          "\r\n          <p class=\"seller-rank\"><img src=\"http://pics.taobaocdn.com/newrank/",
          {
            "type": "references",
            "id": "item",
            "path": [
              {
                "type": "property",
                "id": "ratesumImg"
              }
            ],
            "leader": "$"
          },
          "\"",
          "></p>\r\n          "
        ],
        "\r\n          ",
        [
          {
            "type": "if",
            "condition": {
              "type": "references",
              "id": "item",
              "path": [
                {
                  "type": "property",
                  "id": "goodRate"
                }
              ],
              "leader": "$"
            }
          },
          "\r\n            ",
          [
            {
              "type": "if",
              "condition": {
                "type": "math",
                "expression": [
                  {
                    "type": "references",
                    "id": "item",
                    "path": [
                      {
                        "type": "property",
                        "id": "goodRate"
                      }
                    ],
                    "leader": "$"
                  },
                  {
                    "type": "string",
                    "value": "0.00%"
                  }
                ],
                "operator": "=="
              }
            },
            "\r\n              <p class=\"good-rate\">\u597d\u8bc4\u7387\uff1a\u6682\u65e0\u8bc4\u4ef7</p>\r\n            ",
            {
              "type": "else"
            },
            "\r\n              <p class=\"good-rate\">\u597d\u8bc4\u7387\uff1a",
            {
              "type": "references",
              "id": "item",
              "path": [
                {
                  "type": "property",
                  "id": "goodRate"
                }
              ],
              "leader": "$"
            },
            "<",
            "/p>\r\n            "
          ],
          "\r\n          "
        ],
        "\r\n          ",
        [
          {
            "type": "if",
            "condition": {
              "type": "references",
              "id": "item",
              "path": [
                {
                  "type": "property",
                  "id": "dsrScore"
                }
              ],
              "leader": "$"
            }
          },
          "\r\n          <div class=\"services-box\" data-sellerId=\"",
          {
            "type": "references",
            "id": "item",
            "path": [
              {
                "type": "property",
                "id": "sellerId"
              }
            ],
            "leader": "$"
          },
          "\"",
          ">\r\n            <ul class=\"services\">\r\n              <li class=\"service\">\u5982\u5b9e\u63cf\u8ff0\uff1a",
          {
            "type": "references",
            "id": "item",
            "path": [
              {
                "type": "property",
                "id": "dsrScore"
              }
            ],
            "leader": "$"
          },
          " ",
          "</li>\r\n            </ul>\r\n            <i class=\"triangle\"></i>\r\n          </div>\r\n          "
        ],
        "\r\n        </div>\r\n      </li>\r\n      "
      ],
      "\r\n    </ul>\r\n    "
    ],
    "\r\n    <!-- \u6d88\u8d39\u8005\u4fdd\u969c\u670d\u52a1 tip -->\r\n    <p class=\"m-items-tip\">\u5e26<a class=\"icon\" href=\"",
    "#",
    "\" target=\"_blank\" title=\"\u6d88\u8d39\u8005\u4fdd\u969c\u670d\u52a1\"></a>\u6807\u8bc6\u7684\u5b9d\u8d1d\u652f\u6301<a class=\"link\" href=\"",
    "#",
    "\" target=\"_blank\">\u6d88\u8d39\u8005\u4fdd\u969c\u670d\u52a1</a>\uff0c\u5356\u5bb6\u5df2\u4ea4\u7eb3\u4fdd\u8bc1\u91d1\uff0c\u51fa\u73b0\u95ee\u9898\u5148\u884c\u8d54\u4ed8\u3002</p>\r\n  ",
    {
      "type": "else"
    },
    "\r\n  <!-- \u65e0\u7ed3\u679c -->\r\n  <div class=\"items-null\">\r\n    <h3 class=\"head\">\u5f88\u62b1\u6b49\uff0c\u6ca1\u6709\u627e\u5230\u7b26\u5408\u6761\u4ef6\u7684\u5b9d\u8d1d</h3>\r\n    <p><em>\u5efa\u8bae\u60a8\uff1a</em><span class=\"text\">1\u3001\u9002\u5f53\u51cf\u5c11\u7b5b\u9009\u6761\u4ef6\uff0c\u53ef\u4ee5\u83b7\u5f97\u66f4\u591a\u7ed3\u679c</span><span class=\"text\">2\u3001\u53d8\u66f4\u5b9d\u8d1d\u6240\u5728\u5730\u65f6\u95f4</span><span class=\"text\">3\u3001\u8c03\u6574\u4ef7\u683c\u533a\u95f4</span><span class=\"text\">4\u3001\u5c1d\u8bd5\u5176\u4ed6\u5173\u952e\u5b57</span></p>\r\n  </div>\r\n  "
  ],
  "\r\n  <!-- \u76f8\u5173\u70ed\u95e8\u5b9d\u8d1d -->\r\n  <!-- itemlist.related-items.tmpl -->\r\n  </div>\r\n</div>\r\n\r\n<!-- vim: set ft=html:-->\r\n\r\n"
];
}, {
  requires: []
});
