var sqlite3 = require('sqlite3').verbose();
DatabaseConnection = new sqlite3.Database('../desire.db');


  var MyObject = require('./MyObject');

  var ObjectDesire = require('./ObjectDesire');

  var MyDesire = require('./MyDesire');



/**
 *  Asynchronous calls for Querying Objects.
 */

  MyObject.queryAll(function(allMyObjects){
    console.log('ASYNC ALL::'+allMyObjects.length + '. MyObject records.');

  });

  ObjectDesire.queryAll(function(allObjectDesires){
    console.log('ASYNC ALL::'+allObjectDesires.length + '. ObjectDesire records.');

  });

  MyDesire.queryAll(function(allMyDesires){
    console.log('ASYNC ALL::'+allMyDesires.length + '. MyDesire records.');

  });



/**
 *  Synchronous calls for working with Objects.
 */

  var allMyObjects = MyObject.queryAll();
  console.log('SYNC ALL::'+allMyObjects.length + '. MyObject records.');

  
    //Create a new Object
    var newObject = new MyObject();
    console.log(newObject);

    
      newObject.isSomething = 0;
    

    //Save the Object (insert)
    var newObjectSaved = newObject.save();
    console.log(newObjectSaved);

    //Change the Object property value and Save the Object (update)
    
      newObjectSaved.isSomething = 999;
    

    //Update the Object
    var updatedObject = newObjectSaved.save();
    console.log(updatedObject);

    //Show all Objects
    var allObjects = MyObject.queryAll();
    console.log(allObjects);

    //Delete the Object
    var successfulDelete = updatedObject.delete();
    console.log('successful delete:'+successfulDelete);

    //Show all Objects
    var allObjects = MyObject.queryAll();
    console.log(allObjects);

  


  var allObjectDesires = ObjectDesire.queryAll();
  console.log('SYNC ALL::'+allObjectDesires.length + '. ObjectDesire records.');

  


  var allMyDesires = MyDesire.queryAll();
  console.log('SYNC ALL::'+allMyDesires.length + '. MyDesire records.');

  
    //Create a new Object
    var newObject = new MyDesire();
    console.log(newObject);

    
      newObject.wantsSomething = 0;
    

    //Save the Object (insert)
    var newObjectSaved = newObject.save();
    console.log(newObjectSaved);

    //Change the Object property value and Save the Object (update)
    
      newObjectSaved.wantsSomething = 999;
    

    //Update the Object
    var updatedObject = newObjectSaved.save();
    console.log(updatedObject);

    //Show all Objects
    var allObjects = MyDesire.queryAll();
    console.log(allObjects);

    //Delete the Object
    var successfulDelete = updatedObject.delete();
    console.log('successful delete:'+successfulDelete);

    //Show all Objects
    var allObjects = MyDesire.queryAll();
    console.log(allObjects);

  


