
/**
 *
 * Model Object Constructor
 *
 */
function MyDesire( id, wantsSomething ){

  
    this.id = id;
  
    this.wantsSomething = wantsSomething;
  

}

/**
 * Save a MyDesire instance.
 *
 * Will query to see if it exists first, then update if it exists and insert if it does not exist.
 */
MyDesire.prototype.save = function(fnCallback){

  var currentObject = this;

  $.ajax({
    type: 'POST',
    url: '/save/MyDesire',
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

