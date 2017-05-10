var Fluxmitter = require("../lib/fluxmitter");
var id = 0;

function Title(titledata)
{
    this.id         = id++;
    this.attributes = titledata;
}

Title.prototype = Fluxmitter();

module.exports = Title;
