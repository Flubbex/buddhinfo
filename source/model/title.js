function Title(attr)
{
  for (var prop in attr)
    this[prop] = attr[prop]
}

module.exports = Title;
