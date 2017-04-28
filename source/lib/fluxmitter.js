
// Extend an objects prototype with fluxmitter
// Returns an empty object with fluxmitter as prototype if root===null
var fluxmitter = function(root)
{
    root = root || {};
    
    Object.setPrototypeOf(root,fluxmitter);
    
    //don't clobber existing event tables
    if (!root.events)
        root.events = {}

    return root;
}

//Emit an event to the fluxmitter
// Arguments
//      event (string, name of event chain to trigger)
//      [...] (objects as parameters for the event)
fluxmitter.emit = function() //event,data,args[0],...
{
    var args        = [].slice.call(arguments);
    var event       = args.shift();

    if (!this.events[event])
        if (fluxmitter.strict)
            throw new Error("fluxmitter violation: No such event "+event);
        else
            return null

    var events = this.events[event];

    return events.map(function(eventinfo)
    {
        var argsextended = eventinfo.args.concat(args);
        return {eventinfo:eventinfo,
                result:eventinfo.callback.apply(eventinfo.parent,argsextended)
            };
    });

}

// Add function to event chain
// Arguments
//  event       (string, name of event chain to add callback to)
//  callback    (function, method to add to event chain)
//  parent      (object, will be passed as 'this' to callback)
//  [...]       (objects as primary arguments
fluxmitter.on = function() //event,callback,asThis,arg[0],...
{
    //convert arguments to array
    var args        = [].slice.call(arguments);
    var event       = args.shift();
    var callback    = args.shift();
    var parent      = args.shift();
    //Return null if missing arguments
    if (!callback || !event)
      return null;
      
    var neweventinfo = {callback:callback,
                        parent:parent,
                        args:args};

    if (!this.events[event])
        this.events[event] = [];

    return this.events[event].push(neweventinfo);
};

//Removes callback from event chain
fluxmitter.off = function()
{
    var args        = [].slice.call(arguments);
    var event       = args.shift();
    var callback    = args.shift();

    //Return null if missing arguments
    if (!callback || !event)
      return null;
      
    this.events[event] = this.events[event].filter(function(e){
            return !e.callback===callback;
    });
    
    return this.events[event];
};

//Throws during an emit if no callbacks are found.
//if strict === false then stay quiet.
fluxmitter.strict = false;

module.exports = fluxmitter;

