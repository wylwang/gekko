// 
// The market data provider will fetch data from a datasource on tick. It emits:
// 
// - `trades`: batch of newly detected trades
// - `trade`: after Gekko fetched new trades, this
//   will be the most recent one.

var _ = require('lodash');
var util = require(__dirname + '/../util');

var MarketFetcher = require('./marketFetcher');

var Manager = function(config) {

  _.bindAll(this);

  // fetch trades
  this.source = new MarketFetcher(config);

  // relay newly fetched trades
  this.source
    .on('trades batch', this.relayTrades);
}

util.makeEventEmitter(Manager);

// HANDLERS
Manager.prototype.retrieve = function() {
  this.source.fetch();
}


Manager.prototype.relayTrades = function(batch) {
  this.emit('trades', batch);
}

module.exports = Manager;