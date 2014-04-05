var config = require('./../config/client-config.json');
var Module = require('./Module.js');
var EventGenerator = require('./EventGenerator/EventGenerator.js');
var utils = require("./utils.js");
var events = require("./events.js");

var modules = null;
var cities = null;
var doneFunc = null;
var updateFunc = null;
var intervalID = null;
var gen = null;
var eventFunc = null;
var paused = false;

function timerLoop(){
    var done = true;

    modules.forEach(function(module) {
        
        module.advance(cities);
        done = done && module.done();
    });
    updateFunc(modules,cities);

    var module = getRandomModule(modules);
    // we don't want to be bombarded with events for the last module
    if(!module.done()){
        var city = cities[utils.randomCity(module)];

        var ev = gen.getEvent([
            city.morale, 
            city.costPerDeveloper, 
            module.getPercentComplete(), 
            city.getGlobalDistance()
            ]);


        if(ev){
            ev.module = module;
            ev.city = city;
            eventFunc(ev);
        }
    }

    if(done){
        if(doneFunc){
            doneFunc(modules);
        }
        stop();
    }
}

function start(_modules,_cities, _updateFunc, _doneFunc, _eventFunc, events, eventRate){
    modules = _modules;
    cities = _cities;
    updateFunc = _updateFunc;
    doneFunc = _doneFunc;
    eventFunc = _eventFunc;
    intervalID = setInterval(timerLoop, config.timerDuration);
    gen = new EventGenerator(events,eventRate);
    return intervalID;
}


function unpause(){
    if (paused && modules && cities && updateFunc && doneFunc) {
        paused = false;
        intervalID = setInterval(timerLoop, config.timerDuration);
    }
}

function pause(){
    if(paused){
        unpause();
    } else {
        paused = true;
        clearInterval(intervalID);
    }
}

function stop(){
    clearInterval(intervalID);
    modules = null;
    cities = null;
    doneFunc = null;
    updateFunc = null;
    intervalID = null;
    paused = false;
}


function getRandomModule(modules)
{
   return modules[Math.floor(Math.random()*modules.length)];
}


module.exports = {
    start: start,
    pause: pause,
    stop: stop,
    unpause:unpause,
};
