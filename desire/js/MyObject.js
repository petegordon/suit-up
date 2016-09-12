
/**
 *
 * Model Object Constructor
 *
 */
function MyObject( id, isSomething ){

  
    this.id = id;
  
    this.isSomething = isSomething;
  

}

/**
 * Save a MyObject instance.
 *
 * Will query to see if it exists first, then update if it exists and insert if it does not exist.
 */
MyObject.prototype.save = function(fnCallback){

  var currentObject = this;

  $.ajax({
    type: 'POST',
    url: '/save/MyObject',
    data: JSON.stringify(currentObject),
    success: function(data) {
      if(fnCallback){
        fnCallback(data);
      }
    },
    contentType: "application/json",
    dataType: 'json'
  });

}

