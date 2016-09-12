
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

/**
 * Save a ObjectDesire instance.
 *
 * Will query to see if it exists first, then update if it exists and insert if it does not exist.
 */
ObjectDesire.prototype.save = function(fnCallback){

  var currentObject = this;

  $.ajax({
    type: 'POST',
    url: '/save/ObjectDesire',
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

