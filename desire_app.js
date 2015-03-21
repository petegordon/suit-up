var sqlite3 = require('sqlite3').verbose();
DatabaseConnection = new sqlite3.Database('./desire.db');


  var MyObject = require('./desire/MyObject');

  var ObjectDesire = require('./desire/ObjectDesire');

  var MyDesire = require('./desire/MyDesire');


console.log('starting');
var hello = MyObject.queryAll();
console.log('get results...');
console.log(hello);

/*
  MyObject.queryAll(function(allMyObjects){
    console.log(allMyObjects.length + '. MyObject records.');


    var finalObjectDesires = [];

    for(i=0; i<allMyObjects.length; i++){
      var currentObject = allMyObjects[i];
      console.log(currentObject.isSomething);
      var allMyDesires = getMyDesires(currentObject);
      console.log(allMyDesires);
      for(j=0;j<allMyDesires.length;j++){
        console.log(currentObject.isSomething+' '+allMyDesires[j].wantsSomething);
      }
    }

    //Create a new Object
    //Save the Object (insert)
    //Query the Object by Primary Key
    //Change the Object property value and Save the Object (update)

  });

  function getMyDesires(myObject){
    var objDesires = null;
    var tempDesires = [];
    myObject.getObjectDesires(function(desires){
      if(desires instanceof Array){
        for(j=0; j<desires.length; j++){
          objDesire.getMyDesire(function(desire){
            tempDesires.push(desires[j]);
            if(j == (desires.length-1)){
              objDesires = tempDesires;
              return objDesires;
            }
          });
        }
        if(desires.length == 0){
          objDesires = tempDesires;
          return objDesires;
        }
      } else {
        var objDesire = desires;
        console.log('---not array');
        objDesire.getMyDesire(function(desire){
            tempDesires.push(desire);
            objDesires = tempDesires;
            return objDesires;
        });
      }
    });

    console.log(' done with getMyDesires');



  }
*/

  ObjectDesire.queryAll(function(allObjectDesires){
    console.log(allObjectDesires.length + '. ObjectDesire records.');

    //Create a new Object
    //Save the Object (insert)
    //Query the Object by Primary Key
    //Change the Object property value and Save the Object (update)

  });

  MyDesire.queryAll(function(allMyDesires){
    console.log(allMyDesires.length + '. MyDesire records.');

    //Create a new Object
    //Save the Object (insert)
    //Query the Object by Primary Key
    //Change the Object property value and Save the Object (update)

  });
