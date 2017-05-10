var Lawnchair       = require("lawnchair");
var Fluxmitter      = require("../lib/fluxmitter");
var ConfigModel     = require("../model/config");
var UserdataModel   = require("../model/userdata");
var Store           = require("../class/store");

var Storage_Controller = Fluxmitter({
    lawnchair:  null,
    config:     null,
    userdata:   null,
    setup:      function(callback){
            Storage_Controller.lawnchair = Lawnchair(function(db){

            db.get('config', function(config) {
                Storage_Controller.config =
                    new ConfigModel(config);

                db.save(Storage_Controller.config);

            })

            db.get('userdata', function(userdata) {
                Storage_Controller.userdata
                    = new UserdataModel(userdata);

                db.save(Storage_Controller.userdata);
            })

            callback(Storage_Controller.userdata,
                     Storage_Controller.config);

            Storage_Controller.emit("ready",{
                                config:Storage_Controller.config,
                                userdata:Storage_Controller.userdata
                                });
        })


    },
    ready:      function(callback){
        Storage_Controller.on("ready",callback);
    },
    save:       function(){
        Storage_Controller.lawnchair.save(Storage_Controller.config  );
        Storage_Controller.lawnchair.save(Storage_Controller.userdata);
    },
    nuke:       function(){
        Storage_Controller.lawnchair.nuke();
    }

});

module.exports = Storage_Controller;
