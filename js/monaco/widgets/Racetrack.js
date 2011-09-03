dojo.provide("monaco.widgets.Racetrack");
dojo.require("dijit._Widget");
dojo.require("dijit._Templated");
dojo.require("monaco.widgets.Car");

dojo.declare(
  "monaco.widgets.Racetrack", 
  [dijit._Widget, dijit._Templated], {
    
  /*
   * Class Properties
   */  
    templatePath: dojo.moduleUrl("monaco.widgets","templates/Racetrack.html"),
    _timespan: null,
    _cars: [],

    //dom elements
    _laneContainerElement: null,
    _bannerElement: null,

  /**
   * Load and process the Race data
   * @param {Object} raceData
   */
  loadRaceData: function(raceData) {
    //if we have a timespace property and cars, then process...
    if(raceData.timespan && raceData.cars && raceData.cars.length > 0){
      
      this._timespace = raceData.timespan;
      
      //create Cars...
      dojo.forEach(raceData.cars, function(carData){
        this._addCar(carData);
      }, this);
      
      //display widget, and initialize the cars
      dojo.removeClass(dojo.doc.body, "loading");
      dojo.every(this._cars, function(car){ car._setToStartPosition(); return true; });
    }
    else if(!raceData.timespan) {
      alert("Error: No timespace specified in Race data.");
    }
    else if(!raceData.cars || raceData.cars.length <= 0) {
      alert("Error: No Cars are present in the Race data");
    }
  },
  
  /**
   * Create a new Car widget from the supplied data,
   * and add widget domNode to this racetrack.
   * @param {Object} carData
   */
  _addCar: function(carData) {
    //create a 'lane' and append to the body...
    var laneElement = dojo.doc.createElement("div");
    dojo.addClass(laneElement, "lane");
    this._laneContainerElement.appendChild(laneElement);
    
    //create a car and add to the lane..
    carData.racetrack = this;
    var _car = new monaco.widgets.Car(carData);
    this._cars.push(_car);
    laneElement.appendChild(_car.domNode);
  },
  
  /**
   * Begin the Race
   */
  _beginRace: function() {
    dojo.every(this._cars, function(car){ car._race(); return true; });
  }
  
});
  