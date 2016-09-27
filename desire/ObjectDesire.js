


var sync = require('deasync');
var DatabaseConnection = require('./DatabaseConnection')
  


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

ObjectDesire.getObjectFromSQLResult = function(sqlResult){

  var obj = new ObjectDesire();
  
  obj.id = sqlResult.id;
  
  obj.myObjectId = sqlResult.my_object_id;
  
  obj.myDesireId = sqlResult.my_desire_id;
  
  return obj;

}

/**
 * Save a ObjectDesire instance.
 *
 * Will query to see if it exists first, then update if it exists and insert if it does not exist.
 */
 ObjectDesire.prototype.save = function(fnCallback){

   var ret;
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
             if(fnCallback == null){
               ret = err;
             }else{
               console.log('------------ASYNC END SAVE ObjectDesire----------'+new Date());
               fnCallback(err);
             }

           } else {

             if(results.length >= 1){
               //when exists
               //execute update statement
               ObjectDesire.db().run('update object_desire set  my_object_id = ? ,  my_desire_id = ?  where  id = ? ',
      [ currentObject.myObjectId , currentObject.myDesireId , currentObject.id],
       function(err){
                 if(fnCallback == null){
                   ret = currentObject;
                 }else{
                   console.log('------------ASYNC END SAVE ObjectDesire_----------'+new Date());
                   fnCallback(currentCobject);
                 }
               });
             } else {
               //when not exists execute insert statement
               ObjectDesire.db().run('insert into object_desire( my_object_id , my_desire_id ) VALUES( ? , ? )',
               [ currentObject.myObjectId , currentObject.myDesireId ],
                 function(err){
                 if(err){
                   console.log('------------ASYNC END SAVE ObjectDesire ERROR----------'+new Date());
                   throw err;
                 }
                 currentObject.id = this.lastID;
                 if(fnCallback == null){
                   ret = currentObject;
                 }else{
                   console.log('------------ASYNC END SAVE ObjectDesire_----------'+new Date());
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
           console.log('------------SYNC END SAVE ObjectDesire_----------'+new Date());
           return ret;
         }
 }

 /**
  * Delete a ObjectDesire instance.
  *
  * Will delete the instance of this ObjectDesire based on primary keys ([object Object]).
  */
  ObjectDesire.prototype.delete = function(fnCallback){
       var ret;

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
            function(err){
               if(err){
                 console.log('ERROR::');
                 console.log(err);
                 if(fnCallback == null){
                   ret = err;
                 } else {
                   console.log('------------ASYNC END DELETE ObjectDesire----------'+new Date());
                   fnCallback(err);
                 }
               } else {
                 if(fnCallback == null){
                   ret = true;
                 } else {
                   console.log('------------ASYNC END DELETE ObjectDesire----------'+new Date());
                   fnCallback(true);
                 }
               }

       });

       if(fnCallback == null){
         while(ret === undefined){
           require('deasync').runLoopOnce();
         }
         console.log('------------SYNC END DELETE ObjectDesire_----------'+new Date());
         return ret;
       }

  }


   /**
    * Methods to query all count ObjectDesire instances returns {total:1000}.
    */
   ObjectDesire.queryAllCount= function( fnCallback ){
     var ret;

      if(fnCallback == null){
        console.log('------------SYNC ALL COUNT QUERY ObjectDesire-----------'+new Date());
      }else{
        console.log('------------ASYNC ALL COUNT QUERY ObjectDesire-----------'+new Date());
      }

     var sql = "select count(*) as count from object_desire";
     console.log(sql);
     ObjectDesire.db().all(sql, [], function(err, results){
       if(err){
         console.log('ERROR::');
         console.log(err);
         if(fnCallback == null){
           ret = err;
         } else {
           console.log('------------ASYNC END ALL COUNT QUERY ObjectDesire_----------'+new Date());
           fnCallback(err);
         }
       } else {
           if(fnCallback == null){
             ret = results[0];
           } else {
             console.log('------------ASYNC END ALL COUNT QUERY ObjectDesire_----------'+new Date());
             fnCallback(results[0]);
           }
       }


     });

     if(fnCallback == null){
       while(ret === undefined){
         require('deasync').runLoopOnce();
       }
       console.log('------------SYNC END ALL COUNT QUERY ObjectDesire_----------'+new Date());
       return ret;
     }

   }

 /**
  * Methods to query all ObjectDesire instances.
  */
 ObjectDesire.queryAll= function( fnCallback ){
   var ret;

    if(fnCallback == null){
      console.log('------------SYNC ALL QUERY ObjectDesire-----------'+new Date());
    }else{
      console.log('------------ASYNC ALL QUERY ObjectDesire-----------'+new Date());
    }

   var sql = "select * from object_desire";
   console.log(sql);
   ObjectDesire.db().all(sql, [], function(err, results){
     if(err){
       console.log('ERROR::');
       console.log(err);
       if(fnCallback == null){
         ret = err;
       } else {
         console.log('------------ASYNC END ALL QUERY ObjectDesire_----------'+new Date());
         fnCallback(err);
       }
     } else {
         var objects = [];
         for(var i=0; i<results.length; i++){
           objects.push(ObjectDesire.getObjectFromSQLResult(results[i]));
         }
         if(fnCallback == null){
           ret = objects;
         } else {
           console.log('------------ASYNC END ALL QUERY ObjectDesire_----------'+new Date());
           fnCallback(objects);
         }
     }


   });

   if(fnCallback == null){
     while(ret === undefined){
       require('deasync').runLoopOnce();
     }
     console.log('------------SYNC END ALL QUERY ObjectDesire_----------'+new Date());
     return ret;
   }

 }


  /**
   * Methods to query page (start to end) of ObjectDesire instances.  start index is inclusive, end index is exclusive.  The translation
   *  to SQLite LIMIT OFFSET is this OFFSET=(start-1)  LIMIT=(end-start)
   */
  ObjectDesire.queryPage= function(start, end, fnCallback ){
    var ret;

     if(fnCallback == null){
       console.log('------------SYNC PAGE QUERY ObjectDesire-----------'+new Date());
     }else{
       console.log('------------ASYNC PAGE QUERY ObjectDesire-----------'+new Date());
     }

    var sql = "select * from object_desire LIMIT ? OFFSET ?";
    console.log(sql);
    ObjectDesire.db().all(sql, [(end-start), (start-1)], function(err, results){
      if(err){
        console.log('ERROR::');
        console.log(err);
        if(fnCallback == null){
          ret = err;
        } else {
          console.log('------------ASYNC END ALL QUERY ObjectDesire_----------'+new Date());
          fnCallback(err);
        }
      } else {
          var objects = [];
          for(var i=0; i<results.length; i++){
            objects.push(ObjectDesire.getObjectFromSQLResult(results[i]));
          }
          if(fnCallback == null){
            ret = objects;
          } else {
            console.log('------------ASYNC END ALL QUERY ObjectDesire_----------'+new Date());
            fnCallback(objects);
          }
      }


    });

    if(fnCallback == null){
      while(ret === undefined){
        require('deasync').runLoopOnce();
      }
      console.log('------------SYNC END ALL QUERY ObjectDesire_----------'+new Date());
      return ret;
    }

  }



/**
 * Methods to query a ObjectDesire instance by Primary Key(s) (id)
 */
ObjectDesire.queryByPrimaryKeyId = function( id, fnCallback ){
  var ret;

  if(fnCallback == null){
    console.log('------------SYNC PRIMARY KEY QUERY ObjectDesire(id)-----------'+new Date());
  }else{
    console.log('------------ASYNC PRIMARY KEY QUERY ObjectDesire(id)-----------'+new Date());
  }


  var sql = "select * from object_desire where id = ?";
  console.log(sql);
  ObjectDesire.db().all(sql, [id], function(err, results){
    if(err){
      console.log('ERROR::');
      console.log(err);
      if(fnCallback == null){
        ret = err;
      }else{
        console.log('------------ASYNC END PRIMARY KEY QUERY ObjectDesire(id)-----------'+new Date());
        fnCallback(err);
      }
    } else {
      if (results.length == 1){
        var obj = ObjectDesire.getObjectFromSQLResult(results[0]);
        if(fnCallback == null){
          ret = obj;
        }else{
          console.log('------------ASYNC END PRIMARY KEY QUERY ObjectDesire(id)-----------'+new Date());
          fnCallback(obj);
        }
      } else if (results.length > 1){
        var objects = [];
        for(var i=0; i<results.length; i++){
          objects.push(ObjectDesire.getObjectFromSQLResult(results[i]));
        }
        if(fnCallback == null){
          ret = objects;
        }else{
          console.log('------------ASYNC END PRIMARY KEY QUERY ObjectDesire(id)-----------'+new Date());
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
     console.log('------------SYNC END PRIMARY KEY QUERY ObjectDesire(id)-----------'+new Date());
     return ret;
  }
}




  /**
   *  Method to query an array of ObjectDesire instances by Foreign Key(s)  (myDesireId, myObjectId)
   */
  ObjectDesire.queryByForeignKeysMyDesireIdAndMyObjectId = function( myDesireId, myObjectId, fnCallback ){
    var ret;

    if(fnCallback == null){
      console.log('------------SYNC FOREIGN KEY QUERY ObjectDesire(myDesireId, myObjectId)-----------'+new Date());
    } else {
      console.log('------------ASYNC FOREIGN KEY QUERY ObjectDesire(myDesireId, myObjectId)-----------'+new Date());
    }

    var sql = "select * from object_desire where myDesireId = ? and myObjectId = ?";
    console.log(sql);
    ObjectDesire.db().all(sql, [myDesireId, myObjectId], function(err, results){
      if(err){
        console.log('ERROR::');
        console.log(err);
        if(fnCallback == null){
          ret = err;
        } else {
          console.log('------------ASYNC END FOREIGN KEY QUERY ObjectDesire(myDesireId, myObjectId)-----------'+new Date());
          fnCallback(err);
        }
      } else {
        if (results.length == 1){
          var obj = ObjectDesire.getObjectFromSQLResult(results[0]);
          if(fnCallback == null){
            ret = obj;
          } else {
            console.log('------------ASYNC END FOREIGN KEY QUERY ObjectDesire(myDesireId, myObjectId)-----------'+new Date());
            fnCallback(obj);
          }
        } else if (results.length > 1){
          var objects = [];
          for(var i=0; i<results.length; i++){
            objects.push(ObjectDesire.getObjectFromSQLResult(results[i]));
          }
          if(fnCallback == null){
            ret = objects;
          } else {
            console.log('------------ASYNC END FOREIGN KEY QUERY ObjectDesire(myDesireId, myObjectId)-----------'+new Date());
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
       console.log('------------SYNC END FOREIGN KEY QUERY ObjectDesire(myDesireId, myObjectId)-----------'+new Date());
       return ret;
    }

  }


  /**
   *  Method to query an array of ObjectDesire instances by Foreign Key(s)  (myDesireId)
   */
  ObjectDesire.queryByForeignKeyMyDesireId = function( myDesireId, fnCallback ){
    var ret;

    if(fnCallback == null){
      console.log('------------SYNC FOREIGN KEY QUERY ObjectDesire(myDesireId)-----------'+new Date());
    } else {
      console.log('------------ASYNC FOREIGN KEY QUERY ObjectDesire(myDesireId)-----------'+new Date());
    }

    var sql = "select * from object_desire where my_desire_id = ?";
    console.log(sql);
    ObjectDesire.db().all(sql, [myDesireId], function(err, results){
      if(err){
        console.log('ERROR::');
        console.log(err);
        if(fnCallback == null){
          ret = err;
        } else {
          console.log('------------ASYNC END FOREIGN KEY QUERY ObjectDesire(myDesireId)-----------'+new Date());
          fnCallback(err);
        }
      } else {
        if (results.length == 1){
          var obj = ObjectDesire.getObjectFromSQLResult(results[0]);
          if(fnCallback == null){
            ret = obj;
          } else {
            console.log('------------ASYNC END FOREIGN KEY QUERY ObjectDesire(myDesireId)-----------'+new Date());
            fnCallback(obj);
          }
        } else if (results.length > 1){
          var objects = [];
          for(var i=0; i<results.length; i++){
            objects.push(ObjectDesire.getObjectFromSQLResult(results[i]));
          }
          if(fnCallback == null){
            ret = objects;
          } else {
            console.log('------------ASYNC END FOREIGN KEY QUERY ObjectDesire(myDesireId)-----------'+new Date());
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
       console.log('------------SYNC END FOREIGN KEY QUERY ObjectDesire(myDesireId)-----------'+new Date());
       return ret;
    }

  }


  /**
   *  Method to query an array of ObjectDesire instances by Foreign Key(s)  (myObjectId)
   */
  ObjectDesire.queryByForeignKeyMyObjectId = function( myObjectId, fnCallback ){
    var ret;

    if(fnCallback == null){
      console.log('------------SYNC FOREIGN KEY QUERY ObjectDesire(myObjectId)-----------'+new Date());
    } else {
      console.log('------------ASYNC FOREIGN KEY QUERY ObjectDesire(myObjectId)-----------'+new Date());
    }

    var sql = "select * from object_desire where my_object_id = ?";
    console.log(sql);
    ObjectDesire.db().all(sql, [myObjectId], function(err, results){
      if(err){
        console.log('ERROR::');
        console.log(err);
        if(fnCallback == null){
          ret = err;
        } else {
          console.log('------------ASYNC END FOREIGN KEY QUERY ObjectDesire(myObjectId)-----------'+new Date());
          fnCallback(err);
        }
      } else {
        if (results.length == 1){
          var obj = ObjectDesire.getObjectFromSQLResult(results[0]);
          if(fnCallback == null){
            ret = obj;
          } else {
            console.log('------------ASYNC END FOREIGN KEY QUERY ObjectDesire(myObjectId)-----------'+new Date());
            fnCallback(obj);
          }
        } else if (results.length > 1){
          var objects = [];
          for(var i=0; i<results.length; i++){
            objects.push(ObjectDesire.getObjectFromSQLResult(results[i]));
          }
          if(fnCallback == null){
            ret = objects;
          } else {
            console.log('------------ASYNC END FOREIGN KEY QUERY ObjectDesire(myObjectId)-----------'+new Date());
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
       console.log('------------SYNC END FOREIGN KEY QUERY ObjectDesire(myObjectId)-----------'+new Date());
       return ret;
    }

  }






  /**
   * Method to query related MyDesire instance
   */
  ObjectDesire.prototype.getMyDesire = function(fnCallback){
    MyDesire.queryByPrimaryKey(this.myDesireId, fnCallback);
  }

  /**
   * Method to query related MyObject instance
   */
  ObjectDesire.prototype.getMyObject = function(fnCallback){
    MyObject.queryByPrimaryKey(this.myObjectId, fnCallback);
  }


module.exports = ObjectDesire

