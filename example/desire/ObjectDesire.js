




var MyDesire = require('./MyDesire');
var MyObject = require('./MyObject');

/**
 *
 * Model Object Constructor
 *
 */
function ObjectDesire( id, myObjectId, myDesireId ){


    this.id = id;

    this.myObjectId = myObjectId;

    this.myDesireId = myDesireId;


}

//Object Singleton for database connection
ObjectDesire.db = function(){
  return DatabaseConnection;
}

/**
 * Save a ObjectDesire instance.
 *
 * Will query to see if it exists first, then update if it exists and insert if it does not exist.
 */
 ObjectDesire.prototype.save = function(fnCallback){

   var currentObject = this;

   console.log('------------SAVE ObjectDesire-----------'+new Date());

    if(typeof this.id == 'undefined'){
      this.id = -1;
    }


   //query by current Primary Key
   var sql = "select * from object_desire where id = ?";
   console.log(sql);
   ObjectDesire.db().all(sql,
        [currentObject.id],
        function(err, results){
           if(err){
             console.log('ERROR::');
             console.log(err);
             fnCallback(err);
           } else {

             if(results.length >= 1){
               //when exists
               //execute update statement
               ObjectDesire.db().run('update object_desire set  my_object_id = ? and  my_desire_id = ?  where  id = ? ',
      [ currentObject.myObjectId , currentObject.myDesireId , currentObject.id],
       function(err, results){
                 if(err){
                   throw err;
                 }
                 fnCallback();
               });
             } else {
               //when not exists execute insert statement
               ObjectDesire.db().run('insert into object_desire( my_object_id , my_desire_id ) VALUES( ? , ? )',
               [ currentObject.myObjectId , currentObject.myDesireId ],
                 function(err, results){
                 if(err){
                   throw err;
                 }
                 fnCallback(this.lastID);
               });
             }
           }
           console.log('------------END SAVE ObjectDesire-----------'+new Date());

         });
 }

 /**
  * Delete a ObjectDesire instance.
  *
  * Will delete the instance of this ObjectDesire based on primary keys ([object Object]).
  */
  ObjectDesire.prototype.delete = function(fnCallback){

       var currentObject = this;

       console.log('------------DELETE ObjectDesire-----------'+new Date());

        if(typeof this.id == 'undefined'){
          this.id = -1;
        }


       //query by current Primary Key
       var sql = "delete from object_desire where id = ?";
       console.log(sql);
       ObjectDesire.db().run(sql,
            [currentObject.id],
            function(err, results){
               if(err){
                 console.log('ERROR::');
                 console.log(err);
                 fnCallback(err);
               }
               console.log('------------END DELETE ObjectDesire----------'+new Date());
       });
  }

 /**
  * Methods to query all ObjectDesire instances.
  */
 ObjectDesire.queryAll= function( fnCallback ){
   console.log('------------ALL QUERY ObjectDesire-----------'+new Date());
   var sql = "select * from object_desire";
   console.log(sql);
   ObjectDesire.db().all(sql, [], function(err, results){
     if(err){
       console.log('ERROR::');
       console.log(err);
       fnCallback(err);
     } else {
         for(var i=0; i<results.length; i++){
           results[i].__proto__ = ObjectDesire.prototype;
         }
         fnCallback(results);
     }
     console.log('------------END ALL QUERY ObjectDesire_----------'+new Date());

   });
 }



/**
 * Methods to query a ObjectDesire instance by Primary Key(s) (id)
 */
ObjectDesire.queryByPrimaryKeyId = function( id, fnCallback ){
  console.log('------------PRIMARY KEY QUERY ObjectDesire(id)-----------'+new Date());
  var sql = "select * from object_desire where id = ?";
  console.log(sql);
  ObjectDesire.db().all(sql, [id], function(err, results){
    if(err){
      console.log('ERROR::');
      console.log(err);
      fnCallback(err);
    } else {
      if (results.length == 1){
        results[0].__proto__ = ObjectDesire.prototype;
        fnCallback(results[0]);
      } else if (results.length > 1){
        for(var i=0; i<results.length; i++){
          results[i].__proto__ = ObjectDesire.prototype;
        }
        fnCallback(results);
      }
    }
    console.log('------------END PRIMARY KEY QUERY ObjectDesire(id)-----------'+new Date());

  });
}




  /**
   *  Method to query an array of ObjectDesire instances by Foreign Key(s)  (myDesireId, myObjectId)
   */
  ObjectDesire.queryByForeignKeysMyDesireIdAndMyObjectId = function( myDesireId, myObjectId, fnCallback ){
    console.log('------------FOREIGN KEY QUERY ObjectDesire(myDesireId, myObjectId)-----------'+new Date());
    var sql = "select * from object_desire where myDesireId = ? and myObjectId = ?";
    console.log(sql);
    ObjectDesire.db().all(sql, [myDesireId, myObjectId], function(err, results){
      if(err){
        console.log('ERROR::');
        console.log(err);
        fnCallback(err);
      } else {
        if (results.length == 1){
          results[0].__proto__ = ObjectDesire.prototype;
          fnCallback(results[0]);
        } else if (results.length > 1){
          for(var i=0; i<results.length; i++){
            results[i].__proto__ = ObjectDesire.prototype;
          }
          fnCallback(results);
        }
      }
      console.log('------------END FOREIGN KEY QUERY ObjectDesire(myDesireId, myObjectId)-----------'+new Date());

    });
  }


  /**
   *  Method to query an array of ObjectDesire instances by Foreign Key(s)  (myDesireId)
   */
  ObjectDesire.queryByForeignKeyMyDesireId = function( myDesireId, fnCallback ){
    console.log('------------FOREIGN KEY QUERY ObjectDesire(myDesireId)-----------'+new Date());
    var sql = "select * from object_desire where my_desire_id = ?";
    console.log(sql);
    ObjectDesire.db().all(sql, [myDesireId], function(err, results){
      if(err){
        console.log('ERROR::');
        console.log(err);
        fnCallback(err);
      } else {
        if (results.length == 1){
          results[0].__proto__ = ObjectDesire.prototype;
          fnCallback(results[0]);
        } else if (results.length > 1){
          for(var i=0; i<results.length; i++){
            results[i].__proto__ = ObjectDesire.prototype;
          }
          fnCallback(results);
        }
      }
      console.log('------------END FOREIGN KEY QUERY ObjectDesire(myDesireId)-----------'+new Date());

    });
  }


  /**
   *  Method to query an array of ObjectDesire instances by Foreign Key(s)  (myObjectId)
   */
  ObjectDesire.queryByForeignKeyMyObjectId = function( myObjectId, fnCallback ){
    console.log('------------FOREIGN KEY QUERY ObjectDesire(myObjectId)-----------'+new Date());
    var sql = "select * from object_desire where my_object_id = ?";
    console.log(sql);
    ObjectDesire.db().all(sql, [myObjectId], function(err, results){
      if(err){
        console.log('ERROR::');
        console.log(err);
        fnCallback(err);
      } else {
        if (results.length == 1){
          results[0].__proto__ = ObjectDesire.prototype;
          fnCallback(results[0]);
        } else if (results.length > 1){
          for(var i=0; i<results.length; i++){
            results[i].__proto__ = ObjectDesire.prototype;
          }
          fnCallback(results);
        }
      }
      console.log('------------END FOREIGN KEY QUERY ObjectDesire(myObjectId)-----------'+new Date());

    });
  }






  /**
   * Method to query related MyDesire instance
   */
  ObjectDesire.prototype.getMyDesire = function(fnCallback){
    MyDesire.queryByPrimaryKeyId(this.myDesireId, fnCallback);
  }

  /**
   * Method to query related MyObject instance
   */
  ObjectDesire.prototype.getMyObject = function(fnCallback){
    MyObject.queryByPrimaryKeyId(this.myObjectId, fnCallback);
  }


module.exports = ObjectDesire
