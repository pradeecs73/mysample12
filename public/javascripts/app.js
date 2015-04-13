
App = Ember.Application.create({
  ready:function(){

  }
});



App.Router.map(function() {
   this.resource('signin');
   this.resource('signup');
   this.resource("home",function() {
       this.route("page", { path: "page/:page_id" });
    });
   this.resource('forgotpassword');
   this.resource('changepassword');
   this.resource("pagination");
});


   function savechanges(taskname){
 
	     var taskdescription=$("#taskdescriptiontext").val();
	     var adddetails={};
	    adddetails.taskname=taskname;
	    adddetails.taskdescription=taskdescription;

	       edittask(adddetails,function(data){                         
	             alert(data); 
	             window.location.reload();
	       });
    }

    function canceledit(){
        window.location.reload();      
    }
 

