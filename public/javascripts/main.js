var tickers = [];
var interval;

function reset() {
  tickers = [];

  var exchangeDOMNode = $('#exchange');
  exchangeDOMNode.text('Loading...');
  exchangeDOMNode.removeClass('positive negative');

  $('h1').text($('#cur1').val() + ' - ' + $('#cur2').val() + ' 1 Min. Moving Avg.');

  updateTicker(exchangeDOMNode); // first time
  clearInterval(interval);
  interval = setInterval(function() {
    updateTicker(exchangeDOMNode);
  }, 60 * 1000);
}

function mean() {
  return tickers.reduce(function(acc, val) {
    return acc + parseFloat(val);
  }, 0) / tickers.length;
}

function updateTicker(exchangeDOMNode) {
  var cryptoPair = $('#cur1').val() + '_' + $('#cur2').val();
  $.getJSON('/poloniex/' + cryptoPair, function(data) {
    var prevData = exchangeDOMNode.text();

    // highlight the upward / downward trend
    exchangeDOMNode.removeClass('positive negative');
    exchangeDOMNode.addClass(parseFloat(prevData) > parseFloat(data) ? 'positive' : 'negative');

    if(tickers.length > 10) {
      tickers.shift();
    }
    tickers.push(data);
    exchangeDOMNode.text(mean());
  });
}

$(document).ready(function() {
  var exchangeDOMNode = $('#exchange'); // better to cache selectors
  updateTicker(exchangeDOMNode); // first time
  interval = setInterval(function() {
    updateTicker(exchangeDOMNode);
  }, 60 * 1000);

});
