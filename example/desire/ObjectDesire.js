


  


/**
 *
 * Model Object Constructor
 *
 */
function ObjectDesire( id, objectId, desireId ){

  
    this.id = id;
  
    this.objectId = objectId;
  
    this.desireId = desireId;
  

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
               ObjectDesire.db().run('update object_desire set  object_id = ? and  desire_id = ?  where  id = ? ',
      [ currentObject.objectId , currentObject.desireId , currentObject.id],
       function(err, results){
                 if(err){
                   throw err;
                 }
                 fnCallback();
               });
             } else {
               //when not exists execute insert statement
               ObjectDesire.db().run('insert into object_desire( object_id , desire_id ) VALUES( ? , ? )',
               [ currentObject.objectId , currentObject.desireId ],
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
            }
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
   *  Method to query an array of ObjectDesire instances by Foreign Key(s)  (desireId, objectId)
   */
  ObjectDesire.queryByForeignKeysDesireIdAndObjectId = function( desireId, objectId, fnCallback ){
    console.log('------------FOREIGN KEY QUERY ObjectDesire(desireId, objectId)-----------'+new Date());
    var sql = "select * from object_desire where desireId = ? and objectId = ?";
    console.log(sql);
    ObjectDesire.db().all(sql, [desireId, objectId], function(err, results){
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
      console.log('------------END FOREIGN KEY QUERY ObjectDesire(desireId, objectId)-----------'+new Date());

    });
  }


  /**
   *  Method to query an array of ObjectDesire instances by Foreign Key(s)  (desireId)
   */
  ObjectDesire.queryByForeignKeyDesireId = function( desireId, fnCallback ){
    console.log('------------FOREIGN KEY QUERY ObjectDesire(desireId)-----------'+new Date());
    var sql = "select * from object_desire where desire_id = ?";
    console.log(sql);
    ObjectDesire.db().all(sql, [desireId], function(err, results){
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
      console.log('------------END FOREIGN KEY QUERY ObjectDesire(desireId)-----------'+new Date());

    });
  }


  /**
   *  Method to query an array of ObjectDesire instances by Foreign Key(s)  (objectId)
   */
  ObjectDesire.queryByForeignKeyObjectId = function( objectId, fnCallback ){
    console.log('------------FOREIGN KEY QUERY ObjectDesire(objectId)-----------'+new Date());
    var sql = "select * from object_desire where object_id = ?";
    console.log(sql);
    ObjectDesire.db().all(sql, [objectId], function(err, results){
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
      console.log('------------END FOREIGN KEY QUERY ObjectDesire(objectId)-----------'+new Date());

    });
  }






  /**
   * Method to query related Desire instance
   */
  ObjectDesire.prototype.getDesire = function(fnCallback){
    Desire.queryByPrimaryKey(this.desireId, fnCallback);
  }

  /**
   * Method to query related Object instance
   */
  ObjectDesire.prototype.getObject = function(fnCallback){
    Object.queryByPrimaryKey(this.objectId, fnCallback);
  }


module.exports = ObjectDesire

