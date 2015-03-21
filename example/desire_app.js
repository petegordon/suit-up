var sqlite3 = require('sqlite3').verbose();
DatabaseConnection = new sqlite3.Database('./desire.db');


  var MyObject = require('./desire/MyObject');

  var ObjectDesire = require('./desire/ObjectDesire');

  var MyDesire = require('./desire/MyDesire');


  MyObject.queryAll(function(allMyObjects){
    console.log(allMyObjects.length + '. MyObject records.');
/*
    for(i=0; i<allMyObjects.length; i++){
      var obj = allMyObjects[i];
      var objDesires = [];
      obj.getObjectDesires(function(desires){
        console.log('this');
        console.log(this);
        console.log(i+'. '+desires);
        for(j=0;j<desires.length;j++){
          objDesires.push(desires[j])
        }
        for(k=0;k<objDesires.length;k++){
          objDesires[k].getMyDesire(function(desire){
            console.log(desire);
            console.log(desire.wantsSomething+' '+obj.isSomthing);
          });
        }

        retrievedDesires = true;

      });
      if(i==(allMyObjects.length-1)){

      }
    }
*/

    for(i=0; i<allMyObjects.length; i++){
      var obj = allMyObjects[i];



      console.log('---object');
      console.log(obj);
      obj.getObjectDesires(function(desires){
        console.log('---this');
        console.log(this);
        console.log('---desires');
        console.log(desires);
        console.log('---end desires');
        if(desires instanceof Array){
          console.log('---array');
          for(j=0; j<desires.length; j++){
            var desire = desires[j];
            console.log(desire);
            desire.getMyDesire(function(desire){
              console.log(desire);
              console.log(desire.wantsSomething+' '+obj.isSomthing);
            });
          }
        } else {
          console.log('---not array');
          desires.getMyDesire(function(desire){
            console.log(desire);
            console.log(desire.wantsSomething+' '+obj.isSomthing);
          });
        }
      });

    }

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
