function addtask(adddetails,callback)
{

	       $.ajax ({
                  type: "POST",
                  url:'/addtask', 
                  data:adddetails,                  

             success: function(data) {       
                callback(data);                     
              },
               error: function(data) {
                     alert("Msg: "+ data.status + ": " + data.statusText);

                   }                  
            }); 
}

function signup(adddetails,callback)
{

   $.ajax ({
             type: "POST",
             url:'/signup', 
             data:adddetails,                  

             success: function(data) {      
                 callback(data);     
               },
             error: function(data) {
                  alert("Msg: "+ data.status + ": " + data.statusText);

               }          
           }); 

}

function signin(adddetails,callback)
{

    $.ajax ({

             type: "POST",
             url:'/signin', 
             data:adddetails,                  

             success: function(data) {       
                     callback(data);     
                   },
               error: function(data) {
                     alert("Msg: "+ data.status + ": " + data.statusText);

                   }                  
            }); 

}

function deletetask(adddetails,callback)
{
             $.ajax ({
                  type: "POST",
                  url:'/deletetask', 
                  data:adddetails, 
                  success: function(data) {              
                     callback(data);
                },
               error: function(data) {
                     alert("Msg: "+ data.status + ": " + data.statusText);

                   }                  
            });
}

function edittask(adddetails,callback)
{

           $.ajax ({
                  type: "POST",
                  url:'/edittask', 
                  data:adddetails, 
                  success: function(data) {              
                    callback(data);
                        
                },
               error: function(data) {
                     alert("Msg: "+ data.status + ": " + data.statusText);

                   }                  
            });
}

function forgotpassword(adddetails,callback)
{
          $.ajax ({

             type: "POST",
             url:'/forgotpassword', 
             data:adddetails,                  

             success: function(data) { 
                     callback(data);                
                   },
              error: function(data) {
                     alert("Msg: "+ data.status + ": " + data.statusText);
                   }                  
            }); 
}

function changeuserpassword(adddetails,callback)
{

	 $.ajax ({

             type: "POST",
             url:'/changepassword', 
             data:adddetails,                  

             success: function(data) {
                     callback(data);                  
                   },
              error: function(data) {
                     alert("Msg: "+ data.status + ": " + data.statusText);
                   }                  
            }); 
}