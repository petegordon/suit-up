var sqlite3 = require('sqlite3').verbose();
DatabaseConnection = new sqlite3.Database('../desire.db');


  var MyObject = require('./MyObject');

  var ObjectDesire = require('./ObjectDesire');

  var MyDesire = require('./MyDesire');



  MyObject.queryAll(function(allMyObjects){
    console.log(allMyObjects.length + '. MyObject records.');

    //Create a new Object
    //Save the Object (insert)
    //Query the Object by Primary Key
    //Change the Object property value and Save the Object (update)

  });

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

