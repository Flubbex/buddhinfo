var package  = require("../../package.json");
var Titlelist = require("./titlelist");
function Userdata(attributes){
    attributes       = attributes             || {};
    this.key         = "userdata";
    this.notes       = attributes.notes       || {};
    this.lists       = attributes.lists       || [new Titlelist()];
    this.tags        = attributes.tags        || {};
    this.reading     = attributes.reading     || [];

    this.currentlist = -1;
};

module.exports = Userdata;
