var Fluxmitter = require("../lib/fluxmitter");
var id = 0;

function Titlelist(Titlelistdata)
{
    this.id         = id++;
    this.attributes = Titlelistdata;
}

Titlelist.prototype = Fluxmitter();

module.exports = Titlelist;
