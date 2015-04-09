
App = Ember.Application.create({
  ready:function(){

  }
});

App.Router.map(function() {
   this.resource('signin');
   this.resource('signup');
   this.resource('home');
   this.resource('forgotpassword');
   this.resource('changepassword');
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
 