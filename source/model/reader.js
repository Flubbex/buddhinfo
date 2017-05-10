var Title_Model     = require("./title");

function Reader(attr)
{
    this.closeable  = attr.closeable    || true;
    this.tabindex   = attr.tabindex     || 0;
    this.domid         = attr.domid     || null;
    this.title  = attr.title ? new Title_Model(attr.title) : null;
}

module.exports = Reader;
