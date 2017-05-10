var Fluxmitter      = require("../lib/fluxmitter");
var Reader_Model    = require("../model/reader");
var id = 0;

function Reader(readerdata)
{
    this.attributes      = new Reader_Model(readerdata);
    this.id   = id++;
}

Reader.prototype = Fluxmitter();

module.exports = Reader;
