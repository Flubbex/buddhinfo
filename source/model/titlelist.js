var Title = require("./title");

function Titlelist(args)
{
    args = args || {};
    this.key        = args.key       || "New Titlelist";
    this.titlelist  = args.titlelist || [];
    this.note       = args.note      || null;
    this.config     = args.config    || {};
};

module.exports = Titlelist;
