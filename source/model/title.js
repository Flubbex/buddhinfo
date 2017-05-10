function Title(attr)
{
    attr = attr.attributes ? attr.attributes : attr;

  this.name         = attr.name          || "Title";
  this.description  = attr.description  || "Description";
  this.author       = attr.author       || "Author";
  this.image        = attr.image        || null;
  this.date         = attr.date         || null;
  this.src          = attr.src          || null;
}

module.exports = Title;
