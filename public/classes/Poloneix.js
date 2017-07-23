var autobahn = require('autobahn');
var connection = null;

exports.makePoloniexRequest = function(req, res) {

  // api vars
  var wsuri = "wss://api.poloniex.com";
  connection = new autobahn.Connection({
    url: wsuri,
    realm: "realm1"
  });

  // binding event handlers is cheap
  connection.onopen = function (session) {
    function tickerEvent(args) {
      /* args: ['BTC_BBR','0.00069501','0.00074346','0.00069501','-0.00742634','8.63286802','11983.47150109',0,'0.00107920','0.00045422']
       * Labels: currencyPair, last, lowestAsk, highestBid, percentChange, baseVolume, quoteVolume, isFrozen, 24hrHigh, 24hrLow
       */
      if(args[0] === req.params.cryptoPair) {
        connection.close();
        res.setHeader('Content-Type', 'application/json');
        res.send(args[1]);
      }
    }
    session.subscribe('ticker', tickerEvent);
  };

  connection.open();
};
