function Title(attr)
{
  this.name         = "Title";
  this.description  = "Description";
  this.author       = "Author";
  this.image        = null;
  this.date         = null;
  this.src          = null;
  
  for (var prop in attr)
    this[prop] = attr[prop]
}

module.exports = Title;
