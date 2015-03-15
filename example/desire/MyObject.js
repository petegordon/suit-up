


  
var ObjectDesire = require('./ObjectDesire');
  


/**
 *
 * Model Object Constructor
 *
 */
function MyObject( id, isSomething ){

  
    this.id = id;
  
    this.isSomething = isSomething;
  

}

//Object Singleton for database connection
MyObject.db = function(){
  return DatabaseConnection;
}

/**
 * Save a MyObject instance.
 *
 * Will query to see if it exists first, then update if it exists and insert if it does not exist.
 */
 MyObject.prototype.save = function(fnCallback){

   var currentObject = this;

   console.log('------------SAVE MyObject-----------'+new Date());
    
    if(typeof this.id == 'undefined'){
      this.id = -1;
    }
    

   //query by current Primary Key
   var sql = "select * from my_object where id = ?";
   console.log(sql);
   MyObject.db().all(sql,
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
               MyObject.db().run('update my_object set  is_something = ?  where  id = ? ',
      [ currentObject.isSomething , currentObject.id],
       function(err, results){
                 if(err){
                   throw err;
                 }
                 fnCallback();
               });
             } else {
               //when not exists execute insert statement
               MyObject.db().run('insert into my_object( is_something ) VALUES( ? )',
               [ currentObject.isSomething ],
                 function(err, results){
                 if(err){
                   throw err;
                 }
                 fnCallback(this.lastID);
               });
             }
           }
           console.log('------------END SAVE MyObject-----------'+new Date());

         });
 }

 /**
  * Delete a MyObject instance.
  *
  * Will delete the instance of this MyObject based on primary keys ([object Object]).
  */
  MyObject.prototype.delete = function(fnCallback){

       var currentObject = this;

       console.log('------------DELETE MyObject-----------'+new Date());
        
        if(typeof this.id == 'undefined'){
          this.id = -1;
        }
        

       //query by current Primary Key
       var sql = "delete from my_object where id = ?";
       console.log(sql);
       MyObject.db().run(sql,
            [currentObject.id],
            function(err, results){
               if(err){
                 console.log('ERROR::');
                 console.log(err);
                 fnCallback(err);
               }
            }
       }
       console.log('------------END DELETE MyObject----------'+new Date());

     });
  }

 /**
  * Methods to query all MyObject instances.
  */
 MyObject.queryAll= function( fnCallback ){
   console.log('------------ALL QUERY MyObject-----------'+new Date());
   var sql = "select * from my_object";
   console.log(sql);
   MyObject.db().all(sql, [], function(err, results){
     if(err){
       console.log('ERROR::');
       console.log(err);
       fnCallback(err);
     } else {
         for(var i=0; i<results.length; i++){
           results[i].__proto__ = MyObject.prototype;
         }
         fnCallback(results);
     }
     console.log('------------END ALL QUERY MyObject_----------'+new Date());

   });
 }



/**
 * Methods to query a MyObject instance by Primary Key(s) (id)
 */
MyObject.queryByPrimaryKeyId = function( id, fnCallback ){
  console.log('------------PRIMARY KEY QUERY MyObject(id)-----------'+new Date());
  var sql = "select * from my_object where id = ?";
  console.log(sql);
  MyObject.db().all(sql, [id], function(err, results){
    if(err){
      console.log('ERROR::');
      console.log(err);
      fnCallback(err);
    } else {
      if (results.length == 1){
        results[0].__proto__ = MyObject.prototype;
        fnCallback(results[0]);
      } else if (results.length > 1){
        for(var i=0; i<results.length; i++){
          results[i].__proto__ = MyObject.prototype;
        }
        fnCallback(results);
      }
    }
    console.log('------------END PRIMARY KEY QUERY MyObject(id)-----------'+new Date());

  });
}






  /**
   * Method to query related [object Object]s and return an array of [object Object] instances
   */`  `
  MyObject.prototype.getObjectDesires = function(fnCallback){
    ObjectDesire.queryByForeignKeyObjectId( this.id, fnCallback );
  }




module.exports = MyObject

