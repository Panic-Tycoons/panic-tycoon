var pt = (function () {
  // constructor
  var pt = function () {};

  // prototype
  pt.prototype = {
      constructor: pt
  };

  // this file will export all of the functions in this Module var below.
  var Module = { 
    makemap: function() {
      var map;

      // This is a jvectormap object, which has terrible docs.
      // nearly all settings were inferred from the examples @ http://jvectormap.com/examples/regions-selection/
      map = new jvm.WorldMap({
        width: 720,
        heigth: 300,
        container: $('#map'),
        map: 'world_mill_en',
        regionStyle: {
          initial: {
            fill: '#586e75' //base01
          },
          selected: {
            fill: '#2aa198' //base1
          }
        },
        // zoomOnScroll: false,
        regionsSelectable: true,
        backgroundColor: "transparent",
        onRegionSelected: function(){
          // this enables persistent data of the selected regions
          // it gets called each time a region is selected.
          if (window.localStorage) {
            window.localStorage.setItem(
              'jvectormap-selected-regions',
              JSON.stringify(map.getSelectedRegions().sort())
            );
          }
        }
      });
      // this gets persistent data of the selected regions, and puts them on the map at page load.
      map.setSelectedRegions( JSON.parse( window.localStorage.getItem('jvectormap-selected-regions') || '[]' ) );
    },

    region: function(item){
      // this function will be modified later to return the data only.
      item = item || 'jvectormap-selected-regions';
      var regions = window.localStorage.getItem(item);
      var r = "Regions selected: "+regions;
      document.getElementById("regions").innerHTML=r;
      return regions;
    }
  };

  return Module;
})();