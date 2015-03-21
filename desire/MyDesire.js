


var sync = require('deasync');
  
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

MyDesire.getObjectFromSQLResult = function(sqlResult){

  var obj = new MyDesire();
  
  obj.id = sqlResult.id;
  
  obj.wantsSomething = sqlResult.wants_something;
  
  return obj;

}

/**
 * Save a MyDesire instance.
 *
 * Will query to see if it exists first, then update if it exists and insert if it does not exist.
 */
 MyDesire.prototype.save = function(fnCallback){

   var ret;
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
             if(fnCallback == null){
               ret = err;
             }else{
               console.log('------------ASYNC END SAVE MyDesire----------'+new Date());
               fnCallback(err);
             }

           } else {

             if(results.length >= 1){
               //when exists
               //execute update statement
               MyDesire.db().run('update my_desire set  wants_something = ?  where  id = ? ',
      [ currentObject.wantsSomething , currentObject.id],
       function(err){
                 if(fnCallback == null){
                   ret = currentObject;
                 }else{
                   console.log('------------ASYNC END SAVE MyDesire_----------'+new Date());
                   fnCallback(currentCobject);
                 }
               });
             } else {
               //when not exists execute insert statement
               MyDesire.db().run('insert into my_desire( wants_something ) VALUES( ? )',
               [ currentObject.wantsSomething ],
                 function(err){
                 if(err){
                   console.log('------------ASYNC END SAVE MyDesire ERROR----------'+new Date());
                   throw err;
                 }
                 currentObject.id = this.lastID;
                 if(fnCallback == null){
                   ret = currentObject;
                 }else{
                   console.log('------------ASYNC END SAVE MyDesire_----------'+new Date());
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
           console.log('------------SYNC END SAVE MyDesire_----------'+new Date());
           return ret;
         }
 }

 /**
  * Delete a MyDesire instance.
  *
  * Will delete the instance of this MyDesire based on primary keys ([object Object]).
  */
  MyDesire.prototype.delete = function(fnCallback){
       var ret;

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
            function(err){
               if(err){
                 console.log('ERROR::');
                 console.log(err);
                 if(fnCallback == null){
                   ret = err;
                 } else {
                   console.log('------------ASYNC END DELETE MyDesire----------'+new Date());
                   fnCallback(err);
                 }
               } else {
                 if(fnCallback == null){
                   ret = true;
                 } else {
                   console.log('------------ASYNC END DELETE MyDesire----------'+new Date());
                   fnCallback(true);
                 }
               }

       });

       if(fnCallback == null){
         while(ret === undefined){
           require('deasync').runLoopOnce();
         }
         console.log('------------SYNC END DELETE MyDesire_----------'+new Date());
         return ret;
       }

  }

 /**
  * Methods to query all MyDesire instances.
  */
 MyDesire.queryAll= function( fnCallback ){
   var ret;

    if(fnCallback == null){
      console.log('------------SYNC ALL QUERY MyDesire-----------'+new Date());
    }else{
      console.log('------------ASYNC ALL QUERY MyDesire-----------'+new Date());
    }

   var sql = "select * from my_desire";
   console.log(sql);
   MyDesire.db().all(sql, [], function(err, results){
     if(err){
       console.log('ERROR::');
       console.log(err);
       if(fnCallback == null){
         ret = err;
       } else {
         console.log('------------ASYNC END ALL QUERY MyDesire_----------'+new Date());
         fnCallback(err);
       }
     } else {
         var objects = [];
         for(var i=0; i<results.length; i++){
           objects.push(MyDesire.getObjectFromSQLResult(results[i]));
         }
         if(fnCallback == null){
           ret = objects;
         } else {
           console.log('------------ASYNC END ALL QUERY MyDesire_----------'+new Date());
           fnCallback(objects);
         }
     }


   });

   if(fnCallback == null){
     while(ret === undefined){
       require('deasync').runLoopOnce();
     }
     console.log('------------SYNC END ALL QUERY MyDesire_----------'+new Date());
     return ret;
   }

 }



/**
 * Methods to query a MyDesire instance by Primary Key(s) (id)
 */
MyDesire.queryByPrimaryKeyId = function( id, fnCallback ){
  var ret;

  if(fnCallback == null){
    console.log('------------SYNC PRIMARY KEY QUERY MyDesire(id)-----------'+new Date());
  }else{
    console.log('------------ASYNC PRIMARY KEY QUERY MyDesire(id)-----------'+new Date());
  }


  var sql = "select * from my_desire where id = ?";
  console.log(sql);
  MyDesire.db().all(sql, [id], function(err, results){
    if(err){
      console.log('ERROR::');
      console.log(err);
      if(fnCallback == null){
        ret = err;
      }else{
        console.log('------------ASYNC END PRIMARY KEY QUERY MyDesire(id)-----------'+new Date());
        fnCallback(err);
      }
    } else {
      if (results.length == 1){
        var obj = MyDesire.getObjectFromSQLResult(results[0]);
        if(fnCallback == null){
          ret = obj;
        }else{
          console.log('------------ASYNC END PRIMARY KEY QUERY MyDesire(id)-----------'+new Date());
          fnCallback(obj);
        }
      } else if (results.length > 1){
        var objects = [];
        for(var i=0; i<results.length; i++){
          objects.push(MyDesire.getObjectFromSQLResult(results[i]));
        }
        if(fnCallback == null){
          ret = objects;
        }else{
          console.log('------------ASYNC END PRIMARY KEY QUERY MyDesire(id)-----------'+new Date());
          fnCallback(objects);
        }
      }
    }


  });


  if(fnCallback == null){
     while(ret === undefined){
       require('deasync').runLoopOnce();
     }
     console.log('------------SYNC END PRIMARY KEY QUERY MyDesire(id)-----------'+new Date());
     return ret;
  }
}






  /**
   * Method to query related [object Object]s and return an array of [object Object] instances
   */
  MyDesire.prototype.getObjectDesires = function(fnCallback){
    ObjectDesire.queryByForeignKeyMyDesireId( this.id, fnCallback );
  }




module.exports = MyDesire

