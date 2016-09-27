var sqlite3 = require('sqlite3').verbose();
DatabaseConnection = new sqlite3.Database('../desire.db');

var express = require('express');
var app = express();



  var MyObject = require('./MyObject');

  var ObjectDesire = require('./ObjectDesire');

  var MyDesire = require('./MyDesire');



/**
 *  Asynchronous calls for Querying Objects.
 */
 
   MyObject.queryAllCount(function(countMyObjects){
     console.log('Count ALL:: MyObject records.');
     console.log(countMyObjects);

   });
 
   ObjectDesire.queryAllCount(function(countObjectDesires){
     console.log('Count ALL:: ObjectDesire records.');
     console.log(countObjectDesires);

   });
 
   MyDesire.queryAllCount(function(countMyDesires){
     console.log('Count ALL:: MyDesire records.');
     console.log(countMyDesires);

   });
 

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

  



app.post('/save/:object', function(req, res){
  console.log(req.params.object);
});
app.get('/queryObjectByPK/:object/:id', function(req, res){
  var obj = eval(req.params.object).queryByPrimaryKeyId(req.params.id);
  console.log(obj);
  console.log(req.params.object);
  console.log(req.params.id);
  res.send(obj);
});

app.get('/queryAllObjects/:object', function(req, res){
  console.log('all object');
  console.log(req.params);
  var objArray = eval(req.params.object).queryAll();
  console.log(objArray);
  console.log(req.params.object);
  res.send(objArray);
});

app.get('/queryObjectByFK/:object/:fkObject/:fkName/:fkId', function(req, res){
  console.log(req.params.object);
  console.log(req.params.fkObject);
  console.log(req.params.fkName);
  console.log(req.params.fkId);
  var objArray = eval(req.params.object+'.queryByForeignKey'+req.params.fkObject+req.params.fkName+'('+req.params.fkId+')');
  res.send(objArray);
});

/**
 * TODO::Guess I should use JADE for this...
 */
app.get('/', function (req, res) {
  var output = 'Hello World!';
  var breakStr = '</br></br>';

  output += breakStr;
  
    output += 'http://localhost:3000/queryAllObjects/MyObject';
    output += breakStr;
  
    output += 'http://localhost:3000/queryAllObjects/ObjectDesire';
    output += breakStr;
  
    output += 'http://localhost:3000/queryAllObjects/MyDesire';
    output += breakStr;
  

  //These only work when there is data that matches the provided id=1
  output += breakStr;
  output += 'http://localhost:3000/queryObjectByPK/MyObject/1'
  output += breakStr;
  output += 'http://localhost:3000/queryObjectByFK/ObjectDesire/MyObject/Id/1';
  output += breakStr;
  res.send(output);

});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
