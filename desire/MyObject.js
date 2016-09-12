


var sync = require('deasync');
var DatabaseConnection = require('./DatabaseConnection')
  
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

MyObject.getObjectFromSQLResult = function(sqlResult){

  var obj = new MyObject();
  
  obj.id = sqlResult.id;
  
  obj.isSomething = sqlResult.is_something;
  
  return obj;

}

/**
 * Save a MyObject instance.
 *
 * Will query to see if it exists first, then update if it exists and insert if it does not exist.
 */
 MyObject.prototype.save = function(fnCallback){

   var ret;
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
             if(fnCallback == null){
               ret = err;
             }else{
               console.log('------------ASYNC END SAVE MyObject----------'+new Date());
               fnCallback(err);
             }

           } else {

             if(results.length >= 1){
               //when exists
               //execute update statement
               MyObject.db().run('update my_object set  is_something = ?  where  id = ? ',
      [ currentObject.isSomething , currentObject.id],
       function(err){
                 if(fnCallback == null){
                   ret = currentObject;
                 }else{
                   console.log('------------ASYNC END SAVE MyObject_----------'+new Date());
                   fnCallback(currentCobject);
                 }
               });
             } else {
               //when not exists execute insert statement
               MyObject.db().run('insert into my_object( is_something ) VALUES( ? )',
               [ currentObject.isSomething ],
                 function(err){
                 if(err){
                   console.log('------------ASYNC END SAVE MyObject ERROR----------'+new Date());
                   throw err;
                 }
                 currentObject.id = this.lastID;
                 if(fnCallback == null){
                   ret = currentObject;
                 }else{
                   console.log('------------ASYNC END SAVE MyObject_----------'+new Date());
                   fnCallback(currentCobject);
                 }
               });
             }
           }

         });

         if(fnCallback == null){
           while(ret === undefined){
             require('deasync').runLoopOnce();
           }
           console.log('------------SYNC END SAVE MyObject_----------'+new Date());
           return ret;
         }
 }

 /**
  * Delete a MyObject instance.
  *
  * Will delete the instance of this MyObject based on primary keys ([object Object]).
  */
  MyObject.prototype.delete = function(fnCallback){
       var ret;

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
            function(err){
               if(err){
                 console.log('ERROR::');
                 console.log(err);
                 if(fnCallback == null){
                   ret = err;
                 } else {
                   console.log('------------ASYNC END DELETE MyObject----------'+new Date());
                   fnCallback(err);
                 }
               } else {
                 if(fnCallback == null){
                   ret = true;
                 } else {
                   console.log('------------ASYNC END DELETE MyObject----------'+new Date());
                   fnCallback(true);
                 }
               }

       });

       if(fnCallback == null){
         while(ret === undefined){
           require('deasync').runLoopOnce();
         }
         console.log('------------SYNC END DELETE MyObject_----------'+new Date());
         return ret;
       }

  }

 /**
  * Methods to query all MyObject instances.
  */
 MyObject.queryAll= function( fnCallback ){
   var ret;

    if(fnCallback == null){
      console.log('------------SYNC ALL QUERY MyObject-----------'+new Date());
    }else{
      console.log('------------ASYNC ALL QUERY MyObject-----------'+new Date());
    }

   var sql = "select * from my_object";
   console.log(sql);
   MyObject.db().all(sql, [], function(err, results){
     if(err){
       console.log('ERROR::');
       console.log(err);
       if(fnCallback == null){
         ret = err;
       } else {
         console.log('------------ASYNC END ALL QUERY MyObject_----------'+new Date());
         fnCallback(err);
       }
     } else {
         var objects = [];
         for(var i=0; i<results.length; i++){
           objects.push(MyObject.getObjectFromSQLResult(results[i]));
         }
         if(fnCallback == null){
           ret = objects;
         } else {
           console.log('------------ASYNC END ALL QUERY MyObject_----------'+new Date());
           fnCallback(objects);
         }
     }


   });

   if(fnCallback == null){
     while(ret === undefined){
       require('deasync').runLoopOnce();
     }
     console.log('------------SYNC END ALL QUERY MyObject_----------'+new Date());
     return ret;
   }

 }



/**
 * Methods to query a MyObject instance by Primary Key(s) (id)
 */
MyObject.queryByPrimaryKeyId = function( id, fnCallback ){
  var ret;

  if(fnCallback == null){
    console.log('------------SYNC PRIMARY KEY QUERY MyObject(id)-----------'+new Date());
  }else{
    console.log('------------ASYNC PRIMARY KEY QUERY MyObject(id)-----------'+new Date());
  }


  var sql = "select * from my_object where id = ?";
  console.log(sql);
  MyObject.db().all(sql, [id], function(err, results){
    if(err){
      console.log('ERROR::');
      console.log(err);
      if(fnCallback == null){
        ret = err;
      }else{
        console.log('------------ASYNC END PRIMARY KEY QUERY MyObject(id)-----------'+new Date());
        fnCallback(err);
      }
    } else {
      if (results.length == 1){
        var obj = MyObject.getObjectFromSQLResult(results[0]);
        if(fnCallback == null){
          ret = obj;
        }else{
          console.log('------------ASYNC END PRIMARY KEY QUERY MyObject(id)-----------'+new Date());
          fnCallback(obj);
        }
      } else if (results.length > 1){
        var objects = [];
        for(var i=0; i<results.length; i++){
          objects.push(MyObject.getObjectFromSQLResult(results[i]));
        }
        if(fnCallback == null){
          ret = objects;
        }else{
          console.log('------------ASYNC END PRIMARY KEY QUERY MyObject(id)-----------'+new Date());
          fnCallback(objects);
        }
      } else if(results.length == 0){
        ret = null;
      }
    }


  });


  if(fnCallback == null){
     while(ret === undefined){
       require('deasync').runLoopOnce();
     }
     console.log('------------SYNC END PRIMARY KEY QUERY MyObject(id)-----------'+new Date());
     return ret;
  }
}






  /**
   * Method to query related [object Object]s and return an array of [object Object] instances
   */
  MyObject.prototype.getObjectDesires = function(fnCallback){
    ObjectDesire.queryByForeignKeyMyObjectId( this.id, fnCallback );
  }




module.exports = MyObject

