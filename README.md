node-misc
=========

Misc nodejs tools.

smtp.js - smtp server that outputs received emails - useful for verifying emails & headers


div.js - used to track dividend rates on stocks & output changes - uses mysql & yahoo finance

CREATE TABLE `stock` (
  `symbol` varchar(5) NOT NULL,
  `dividendPerShare` varchar(10) DEFAULT NULL,
  PRIMARY KEY (symbol)
)
