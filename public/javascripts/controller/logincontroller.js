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

App.HomeController = Ember.Controller.extend({
    page:1,
    pagelimit:7, 
  paginatedContent:(function(){
       var obj= fngetEmpDetails();  
       var start = (this.get('page') - 1) * this.get('pagelimit');
       var last =  this.get('pagelimit');    
       return obj.responseJSON.splice(start,last);
      }).property('page','pagelimit'),
totalpage:(function(){     
       var obj= fngetEmpDetails();  
       var smodel=obj.responseJSON;
   return Math.ceil(smodel.length/this.get('pagelimit'));
}).property('pagelimit'),

 pages: (function() {
    var collection = new Array();
    for(var i = 0; i < this.get('totalpage'); i++) {
      var objArry={number:i+1};
      collection.push(objArry);
    }
    return collection;      
  }).property('totalpage'),

  prevPage: (function() {
    var page = this.get('page');
    var totalPages = this.get('totalpage');
    
    if(page > 1 && totalPages > 1) {
      return page-1;
    } else {
      return null;
    }
  }).property('page', 'totalpage'),
   nextPage: (function() {
    var page = this.get('page');
    var totalPages = this.get('totalpage');
    if(page < totalPages && totalPages > 1) {
      return page+1;
    } else {
      return null;
    }
  }).property('page', 'totalpage'),
     actions: {
      goToPage:function(number){
          this.set('page',number);
          var obj=fngetEmpDetails();
          var smodel=obj.responseJSON;
          var start = (this.get('page') - 1) * this.get('pagelimit');
          var last = this.get('pagelimit');
          this.set('paginatedContent',smodel.splice(start,last));
       },
    selectPrevPage: function() {
          var page = this.get('page');
          var totalPages = this.get('totalpage');
          if(page > 1 && totalPages > 1) {
           this.set('page',page-1);
          }
          else
            this.set('page',1);

        var obj=fngetEmpDetails();
        var smodel=obj.responseJSON;
          var start = (this.get('page') - 1) * this.get('pagelimit');
          var last = this.get('pagelimit');
          this.set('paginatedContent',smodel.splice(start,last));
      },
       selectNextPage: function() {
        
        var page = this.get('page');
        var totalPages = this.get('totalpage');
    
        if(page < totalPages && totalPages > 1) {
           this.set('page',page+1);
        }
        else{
           this.set('page',1);
           }
         var obj=fngetEmpDetails();
         var smodel=obj.responseJSON; 
          var start = (this.get('page') - 1) * this.get('pagelimit');
          var last = this.get('pagelimit');
          this.set('paginatedContent',smodel.splice(start,last));
      },
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
                     var obj= fngetEmpDetails(); 
                     var NewTotal=Math.ceil(obj.responseJSON.length/that.get('pagelimit'));
                     that.set('totalpage',NewTotal);
                    if(obj.responseJSON.length <=that.get('pagelimit')){
                      that.set('page',0);
                      that.set('paginatedContent',obj.responseJSON);
                    }
                    else
                    {
                        that.set('page',1);
                        var start = (that.get('page') - 1) * that.get('pagelimit');
                        var last = start + that.get('pagelimit');
                        that.set('paginatedContent',obj.responseJSON.splice(start,last));
                    }

                      // window.location.reload();        
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
         var that=this;
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
                     var obj= fngetEmpDetails(); 
                     var NewTotal=Math.ceil(obj.responseJSON.length/that.get('pagelimit'));
                     that.set('totalpage',NewTotal);
                    if(obj.responseJSON.length <=that.get('pagelimit')){
                      //this.set('nextPage',false);
                      that.set('page',0);
                      that.set('paginatedContent',obj.responseJSON);
                    }
                    else
                    {
                        that.set('page',1);
                        var start = (that.get('page') - 1) * that.get('pagelimit');
                        var last = start + that.get('pagelimit');
                        //this.set('nextPage',false);
                        that.set('paginatedContent',obj.responseJSON.splice(start,last));
                    }
 
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
          
          var dynamicid=params._id;
          var editableclass="editable"+dynamicid;

          $("#editchanges"+dynamicid+"").css("display", "none");
          $("#savechanges"+dynamicid+"").css("display", "block");
          
         $("."+editableclass+"").each(function (index) {
           var textval=$(this).text();

            $(this).replaceWith("<input type='text' class='"+editableclass+"' value='"+textval+"'>" ); 
          
        }); 
          
      },
      savetask:function(params)
      {
         var that=this; 
         var adddetails={};

          var dynamicid=params._id;
          var taskname=params.taskname;
          var editableclass="editable"+dynamicid;
          adddetails.taskname=taskname;

         $("."+editableclass+"").each(function (index) {
            
            if(index == 0)
            {
              adddetails.taskdescription=$(this).val();
            }    
            var value=$(this).val();
       
           $(this).replaceWith("<label class='"+editableclass+"'>"+value+"</label>");

         });

         edittask(adddetails,function(data){                        
               alert(data); 
               $("#editchanges"+dynamicid+"").css("display", "block");
               $("#savechanges"+dynamicid+"").css("display", "none");
                                 
         });
 
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

function fngetEmpDetails(){
  try
  { 
       var obj = $.ajax({
              url: "http://localhost:3000/retreivetask",
              type: 'GET',
              dataType:"json", 
              async:false,
              success: function( data){
              
              },

              error: function(data){
                 
              }
          }); 
      return obj;

  }
  catch(ex)
  { 
    console.log(ex)
  }

 }