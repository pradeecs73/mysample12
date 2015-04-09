App.SignupController=Ember.Controller.extend({
actions:{
  //user signup
  signupclick:function()
  {
    $("#validatemessage").html("");    
    var that=this;
    var name=$("#name").val();
    var username=$("#username").val();
    var email=$("#email").val(); 
    var password=$("#password").val();
    var reg =/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

    if(name == "" || username == "" || email == "" || password == "")
    {

      $("#validatemessage").html("Enter the required fields");
    }
    else if(!reg.test(email))
    {
      $("#validatemessage").html("Enter valid email");
     }
    else
      {

    var adddetails={};
        adddetails.name=name;
        adddetails.email=email;
        adddetails.username=username;
        adddetails.password=password;

        signup(adddetails,function(data){

              if(data.status=="0")
               {
                 $("#validatemessage").html("User already exist");   
               }
               else
               {
                 alert("succusfully registered");
                 that.transitionToRoute('index');  
               } 

        });

      }
   }
 }
   
});

App.SigninController=Ember.Controller.extend({

actions:{
  //user signin
signinclick:function()
{
    $("#validatemessage").html("");
    var that=this;  
    var email=$("#signinemail").val();
    var password=$("#signinpassword").val();
         
    if(email == "" || password == "")
    {
     
      $("#validatemessage").html("Enter the required fields");
    }
    else
    {

    var adddetails={};

    adddetails.email=email;
    adddetails.password=password;

       signin(adddetails,function(data){

             if(data.result < 1)
              {                                        
                $("#validatemessage").html("Invalid email or password");
              }
            else
              {
                var sessionname=data.sessionname[0].username;
                var sessionemail=data.sessionname[0].email;     
                setCookie("username", sessionname, 30);
                setCookie("email", sessionemail, 30); 
                that.transitionToRoute('index');    
              }
                    
       });

        }

     }
   }

});

App.HomeController=Ember.Controller.extend({

  actions: {
      signout : function(){
         var that=this;  
         document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
         that.transitionToRoute('index');  
      },
      changepassword : function(){
         var that=this;  
         that.transitionToRoute('changepassword');  
      },
      addnewtask:function(){

         var that=this;

      var addingtask='<table><tr><span id="validatemessage" style="color:red;"></span></tr><tr><td>Task Name</td><td><input type="text" id="taskname"></td></tr><tr><td>Task Description</td><td><textarea id="taskdescription" style="margin-top:10px;"></textarea></td></tr></table>'  
        
  bootbox.dialog({
           message :addingtask,
           title: "",
           buttons: {
           success: {
           label: "Add new task",
           className: "btn-success",
           callback: function() 
           {

           $("#validatemessage").html("");
            var taskname=$("#taskname").val();
            var taskdescription=$("#taskdescription").val();
             
              if(taskname == "" || taskdescription == "")
                {
     
                  $("#validatemessage").html("Enter the required fields");
                  return false;
                }
            else{
                   var adddetails={};
                    adddetails.taskname=taskname;
                    adddetails.taskdescription=taskdescription;

                    addtask(adddetails,function(data){
                    if(data.status == "0")
                    {
                      alert("Task already exist"); 
                    }
                   else
                    {
                      alert("Task succusfully added");
                      window.location.reload();       
                    }

                 });           
                }
      
            }
          },
      failur: {
      label: "cancel",
      className: "btn-success",
      callback: function() {


             }
          }
        }
     }); 
  
      },
      deletetask:function(params)
      {
         var taskname=params.taskname;
         bootbox.dialog({
           message :'Are you sure you want to delete this task',
           title: "",
           buttons: {
           success: {
           label: "Delete",
           className: "btn-success",
           callback: function() 
           {

            var adddetails={};
                    adddetails.taskname=taskname;
               
               deletetask(adddetails,function(data){              
                         alert("Task deleted");
                         window.location.reload();
               });

           }
         },
         failur: {
      label: "cancel",
      className: "btn-success",
      callback: function() {


             }
          }
         }
         }); 

           
      },
      edittask:function(params)
      {
          var taskname=params.taskname;
          var taskdescription=params.taskdescription;
          var dynamicid=params._id;
          $("#taskdescription"+dynamicid).html("<input type='text' id='taskdescriptiontext' value='"+taskdescription+"'>");
          $("#savechanges"+dynamicid).html("<img src='images/save.png' onclick='savechanges(\""+taskname+"\")' alt='user' style='width:20px;height:20px;'>");
          
      }
  }
  
});

App.ForgotpasswordController=Ember.Controller.extend({

  actions: {
      forgotpassword : function(){
           var that=this;

          $("#validatemessage").html("");

          var forgotpasswordemail=$("#forgotpasswordemail").val();
          var reg =/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
          var text = "";
          var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

           for( var i=0; i < 8; i++ )
              text += charset.charAt(Math.floor(Math.random() * charset.length));
          var adddetails={};

          adddetails.forgotpasswordemail=forgotpasswordemail;
          adddetails.newpassword=text;

            if(forgotpasswordemail == "" )
             {

                $("#validatemessage").html("Enter the required fields");
             }
          else if(!reg.test(forgotpasswordemail))
            {
                $("#validatemessage").html("Enter valid email");
            }
           else
            {

             forgotpassword(adddetails,function(data){  

                    if(data.status=="0")
                  {
                     $("#validatemessage").html("Please enter registered email id");   
                  }
                  else
                  {
                    alert("New password sent to your mail check your inbox");
                    that.transitionToRoute('index');  
                  }

             });

            }

      }
  }

  });

App.ChangepasswordController=Ember.Controller.extend({

    actions: {
      changeuserpassword : function(){
        var that=this;

        $("#validatemessage").html("");

       var useremail=getCookie("email");
       var changepassword=$("#changepassword").val();
       var confirmchangepassword=$("#confirmchangepassword").val();

       var adddetails={};
       adddetails.useremail=useremail;
       adddetails.userpassword=changepassword;
  
         if(changepassword == "" || confirmchangepassword == "")
        {

            $("#validatemessage").html("Enter the required fields");
        }
        else if(changepassword != confirmchangepassword)
        {
            $("#validatemessage").html("password mismatch");
        }
        else
        {
           changeuserpassword(adddetails,function(data){ 
             alert("Password successfully changed"); 
             document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
             document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC";  
             that.transitionToRoute('index');
           });     
        }    
         
      }
     }

});

//set cookie for username
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}