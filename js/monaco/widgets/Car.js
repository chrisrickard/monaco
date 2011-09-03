dojo.provide("monaco.widgets.Car");

dojo.declare(
  "monaco.widgets.Car", 
  [dijit._Widget, dijit._Templated], 
  {
    templatePath: dojo.moduleUrl("monaco.widgets","templates/Car.html"),
    racetrack: null,
    name: null,
    sales: null,
    
    /**
     * Widget Post Create
     */
    postCreate: function() {
      dojo.addClass(this.domNode, ("car_" + (this.racetrack._cars.length+1) ));
    },
    
    /*
     * Set Car in initial start position
     */
    _setToStartPosition: function() {
      var top = (this.racetrack._laneContainerElement.offsetHeight - this.domNode.offsetHeight);
      this.domNode.style.top = top + "px";
    },
    
    /*
     * Begin race
     */
    _race: function() {
      var _rand = (Math.floor(Math.random()*18)) * 500;
      dojo.anim(this.domNode, { top: 0 }, _rand);
    },
    
});
  