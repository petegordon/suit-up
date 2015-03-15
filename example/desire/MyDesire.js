


  
var ObjectDesire = require('./ObjectDesire');
  


/**
 *
 * Model Object Constructor
 *
 */
function MyDesire( id, wantsSomething ){

  
    this.id = id;
  
    this.wantsSomething = wantsSomething;
  

}

//Object Singleton for database connection
MyDesire.db = function(){
  return DatabaseConnection;
}

/**
 * Save a MyDesire instance.
 *
 * Will query to see if it exists first, then update if it exists and insert if it does not exist.
 */
 MyDesire.prototype.save = function(fnCallback){

   var currentObject = this;

   console.log('------------SAVE MyDesire-----------'+new Date());
    
    if(typeof this.id == 'undefined'){
      this.id = -1;
    }
    

   //query by current Primary Key
   var sql = "select * from my_desire where id = ?";
   console.log(sql);
   MyDesire.db().all(sql,
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
               MyDesire.db().run('update my_desire set  wants_something = ?  where  id = ? ',
      [ currentObject.wantsSomething , currentObject.id],
       function(err, results){
                 if(err){
                   throw err;
                 }
                 fnCallback();
               });
             } else {
               //when not exists execute insert statement
               MyDesire.db().run('insert into my_desire( wants_something ) VALUES( ? )',
               [ currentObject.wantsSomething ],
                 function(err, results){
                 if(err){
                   throw err;
                 }
                 fnCallback(this.lastID);
               });
             }
           }
           console.log('------------END SAVE MyDesire-----------'+new Date());

         });
 }

 /**
  * Delete a MyDesire instance.
  *
  * Will delete the instance of this MyDesire based on primary keys ([object Object]).
  */
  MyDesire.prototype.delete = function(fnCallback){

       var currentObject = this;

       console.log('------------DELETE MyDesire-----------'+new Date());
        
        if(typeof this.id == 'undefined'){
          this.id = -1;
        }
        

       //query by current Primary Key
       var sql = "delete from my_desire where id = ?";
       console.log(sql);
       MyDesire.db().run(sql,
            [currentObject.id],
            function(err, results){
               if(err){
                 console.log('ERROR::');
                 console.log(err);
                 fnCallback(err);
               }
               console.log('------------END DELETE MyDesire----------'+new Date());
       });
  }

 /**
  * Methods to query all MyDesire instances.
  */
 MyDesire.queryAll= function( fnCallback ){
   console.log('------------ALL QUERY MyDesire-----------'+new Date());
   var sql = "select * from my_desire";
   console.log(sql);
   MyDesire.db().all(sql, [], function(err, results){
     if(err){
       console.log('ERROR::');
       console.log(err);
       fnCallback(err);
     } else {
         for(var i=0; i<results.length; i++){
           results[i].__proto__ = MyDesire.prototype;
         }
         fnCallback(results);
     }
     console.log('------------END ALL QUERY MyDesire_----------'+new Date());

   });
 }



/**
 * Methods to query a MyDesire instance by Primary Key(s) (id)
 */
MyDesire.queryByPrimaryKeyId = function( id, fnCallback ){
  console.log('------------PRIMARY KEY QUERY MyDesire(id)-----------'+new Date());
  var sql = "select * from my_desire where id = ?";
  console.log(sql);
  MyDesire.db().all(sql, [id], function(err, results){
    if(err){
      console.log('ERROR::');
      console.log(err);
      fnCallback(err);
    } else {
      if (results.length == 1){
        results[0].__proto__ = MyDesire.prototype;
        fnCallback(results[0]);
      } else if (results.length > 1){
        for(var i=0; i<results.length; i++){
          results[i].__proto__ = MyDesire.prototype;
        }
        fnCallback(results);
      }
    }
    console.log('------------END PRIMARY KEY QUERY MyDesire(id)-----------'+new Date());

  });
}






  /**
   * Method to query related [object Object]s and return an array of [object Object] instances
   */
  MyDesire.prototype.getObjectDesires = function(fnCallback){
    ObjectDesire.queryByForeignKeyMyDesireId( this.id, fnCallback );
  }




module.exports = MyDesire

