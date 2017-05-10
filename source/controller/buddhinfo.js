var Fluxmitter            = require("../lib/fluxmitter");

var Storage_Controller    = require("./storage");

var Menu_View             = require("../view/menu");
var Titlelist_View        = require("../view/titlelist");
var Dashboard_View        = require("../view/dashboard");
var Settings_View         = require("../view/settings");
var Title_View            = require("../view/title");

var Titlelist             = require("../class/titlelist");
var Reader                = require("../class/reader");
var Userdata_Model        = require("../model/userdata");

function Buddhinfo_Controller()
{
  this.storage        = Storage_Controller;
  this.views          = {};
  this.nuked          = false;
  this.reading        = [];
  this.filelist       = null;
  this.config         = null;
  this.userdata       = null;
  this.tabdata        = null;

  var self = this;

  this.storage.setup(function(userdata,config)
  {
      self.userdata         = userdata;
      self.config           = config;
  });
}

Buddhinfo_Controller.prototype = Fluxmitter();

Buddhinfo_Controller.prototype.ready  = function(callback)
{
  this.on("ready",callback);
};

Buddhinfo_Controller.prototype.save = function()
{
    this.userdata.reading = this.reading.filter(function(e){
                                       return e
                                    });
    if (!this.nuked)
        this.storage.save();
};

Buddhinfo_Controller.prototype.addToList = function(title)
{
    if (this.userdata.currentlist >= 0)
    {
        this.userdata.lists[this.userdata.currentlist].titlelist.push(title);
    }
    else
    {
        $("<div title='Oops'><p>You don't have a list active! </p></div>")
            .dialog();
    }
};

Buddhinfo_Controller.prototype.makeReaderTab   = function(domid,name)
{
  var data = {};

  //header
  data.header =
  $("<li><a href='#"+domid+"'>"+name+"</a></li>")
                                    .appendTo("#tabbar");

  //body
  data.tab =
  $("<div id='"+domid+"'>"+this.tabdata+"</div>")
                    .appendTo("#content");

  return data;
};

Buddhinfo_Controller.prototype.openTitle = function(data,nofocus,noadd)
{
    var reader = this.readTitle(data,nofocus)
        if (!noadd)
            this.reading.push(reader)
    return reader;
};

Buddhinfo_Controller.prototype.readTitle = function(data,nofocus)
{
    var index      = $("#tabbar").children().length-3;

    var readerdata = new Reader(data.src
                    ? {
                      closeable:    true,
                      tabindex:     index,
                      title:        data,
                      domid:        "tab_"+index,
                      }
                    : data.attributes );


    readerdata
        .attributes
        .domelement = this.makeReaderTab(readerdata
                                        .attributes
                                        .domid,
                                    readerdata
                                        .attributes
                                        .title
                                        .name);

    //tab view
    this.views[readerdata.attributes.domid] =
        Title_View(this,"#"+readerdata
                            .attributes
                            .domid,
                            readerdata.attributes,
                            this.userdata)

    if (!nofocus)
        $("#content").tabs('refresh').tabs({active:readerdata
                                    .attributes
                                    .tabindex+3});

    return readerdata;

}

Buddhinfo_Controller.prototype.closeTab = function(id)
{
    var viewdata = this.views[id].reader;

    if (viewdata)
    {
        viewdata.domelement.header.remove();

        $("#"+viewdata.domelement.tab.attr('id')).remove();

        $("#content").tabs({active:1});

        delete this.views[id];
        delete this.reading[viewdata.tabindex];

    }
    else
    {
        console.log("No view found for",viewdata);
    }
}

Buddhinfo_Controller.prototype.nuke     = function()
{
    this.nuked = true;
    this.storage.nuke();
}

Buddhinfo_Controller.prototype.reloadPage = function(timeout){
      window.setTimeout(function(){
                                location.reload();
                            },timeout||2500);
  }

Buddhinfo_Controller.prototype.start = function(filelist)
{
    this.filelist       = new Titlelist(filelist);
    this.reading        = this.userdata.reading;
    this.tabdata        = $(".readertab").html();

    if (this.config.firsttime)
    {
        $("<div title='Welcome!'><p>"
        +"Enjoy the new and improved Buddhanet books - now with reading "
        +"lists, tabs, notes and all the other things you guys wanted!"
        +"</p><p>Please posts your thoughts on this new revision on the "
        +"<a href='https://www.reddit.com/r/Buddhism/comments/67nq6u/im_making_a_mobilefriendly_reader_for_buddhanet/'>"
        +"Reddit thread</a>, it's appreciated. Thanks!"
        +"</p></div>").dialog();
        this.config.firsttime = false;
    }
    var self = this;

    this.views["menu"] =
        Menu_View("#tabbar", this.userdata.reading)

    this.views["dashboard"] =
        Dashboard_View(this,"#dashboard",this.userdata);

    this.views["settings"] =
        Settings_View(this,"#settings",     this.config);

     this.views["titlelist"] =
        Titlelist_View(this,
                        "#titlelist",this.filelist.attributes,
                                    this.config);


    this.on("closeTab",this.closeTab,this);
    this.on("nuke",this.nuke,this);
    this.on("reloadPage",this.reloadPage,this);
    this.on("openTitle",this.openTitle,this);
    this.on("readTitle",this.readTitle,this);
    this.on("addToList",this.addToList,this);

  this.reading = this.reading.map(function(reader){
      return self.readTitle(reader,true);
    });

  //$("#content").tabs("refresh");

  this.emit("ready",this);
};

module.exports =  Buddhinfo_Controller;
