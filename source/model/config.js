var Config = function(attributes){
    attributes      = attributes || {};
    this.key        = "config";
    this.version    = "0.0.0";
    this.theme      = "base";
    this.expandall  = false;
    this.firsttime  = true;

    for (var attr in attributes)
      this[attr] = attributes[attr];
};

module.exports = Config;
