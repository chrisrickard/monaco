dojo.provide("monaco.Application");
dojo.require("monaco.widgets.Racetrack");

dojo.declare(
  "monaco.Application", null, {
    
  /*
   * Class Properties
   */  
    _racetrack: null,
    _racedata_path: "js/monaco/jsondata/race_data.json",
    _racedata: null,
    
  /**
   * Constructor
   */  
  constructor: function() {
    this._createRacetrack();
    
    setTimeout(dojo.hitch(this, function(){
      this._getRaceData();
    }), 400);
  },
  
  /**
   * Create Racetrack widget and add to page
   */
  _createRacetrack: function() {
    this._racetrack = new monaco.widgets.Racetrack();
    dojo.doc.body.appendChild(this._racetrack.domNode);
  },
  
  /**
   * Retrive Racetrack setup data
   */
  _getRaceData: function() {
    dojo.xhrGet({
      url: this._racedata_path,
      handleAs: "json",
      load: dojo.hitch(this, function(data) { 
        //on data load...
        this._racetrack.loadRaceData(data);
      }),
      error: dojo.hitch(this, function(e) {
        //on error...
        console.error(e);
        alert("Error: could not load Race data. (" + this._racedata_path + ")");
      })
    });
  }
  
});
  