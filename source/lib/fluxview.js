var Fluxmitter = require("./fluxmitter");

function Fluxview(attributes)
{
    var view = Object.create(Fluxmitter());

    view.hook = function()
    {
        var arguments   = [].slice.call(arguments);
        var domelement  = arguments.shift();
        var event       = arguments.shift();
        var callback    = arguments.shift();
        var parent      = arguments.shift();

        var self        = this;
        if (!domelement)
            throw new Error("Fluxview: No DOM element specified (DOM ready?)");
        if (!event)
            throw new Error("Fluxview: Invalid argument to view.hook (event)");
        if (!callback)
            throw new Error("Fluxview: Invalid argument to view.hook (callback)");

        domelement.addEventListener(event,function(){
            callback.apply(parent||self||this,arguments);
        });
    };

    view.properties = {};

    for (var attr in attributes)
    {
        switch(typeof(attributes[attr]))
        {
            case "function":
                view[attr] = attributes[attr];
                view.on("call_"+attr,view[attr],view);
                break
            default:
                view.properties[attr] = attributes[attr];
                break;
        };
    };

    //Runs when DOM is ready
    Fluxview.domloaders.push(function(window)
    {
        view.el =   window
                    .document
                    .getElementById(view.properties.el);

        if (view.el === null)
            throw new Error("Fluxview: No element with id '"
                +view.properties.el
                +"' found");

        //Run initialize as method or emit as an event
        if (view.initialize)
            switch (typeof(view.initialize))
            {
                case "function":
                    view.initialize.apply(view,arguments);
                    break;
                case "string":
                    view.emit(view.initialize,arguments)
                    break;
                default:
                    break;
            }
    });

    return view;
}

Fluxview.domloaders = [];

Fluxview.ready = function(window)
{
    Fluxview.domloaders.map(function(loader)
    {
        loader(window);
    });

}

module.exports = Fluxview;
