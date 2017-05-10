var Fluxmitter = require("../lib/fluxmitter");

function Store(data)
{
    this.data = data;
}

Store.prototype = Fluxmitter();

Store.prototype.add    = function(model)
{
};

Store.prototype.saveTo = function(lawnchair)
{
};

module.exports = Store;
