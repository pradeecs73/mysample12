     var nodemailer = require("nodemailer");
   
       // Create a SMTP transport object
      var transport = nodemailer.createTransport("SMTP", {
        service: 'Gmail',
        auth: {
            user: "esseasy@gmail.com",
            pass: "esssrs!234"
        }
    });


	var mongo = require('mongodb');
	var dbservice=require('../model/query');

    //user signup
	exports.signup = function(req, res) {

		var wine=req.body;
		var name=req.body.name;
		var username=req.body.username;
		var email=req.body.email;
		var password=req.body.password;

		if(name == "" || username == "" || email == "" || password == "")
		 {

		 	 res.send(400);
		 }	
        else
         {
        var delay=1000;

        setTimeout(function(){
     dbservice.checkexists("profile",{email:email},function(items){
             if(items.length > 0)
		    {
		     res.send({status:"0"});
		    }
		    else
		    {
		     dbservice.save("profile",wine,function(result){ 
                 res.send(result);
              });
		    }  	
             
	      });   
},delay);

 }       

}

   //user signin
	exports.signin = function(req, res) {

		var email=req.body.email;
		var password=req.body.password;

		if(email == "" || password == "")
		 {

		 	res.sendStatus(400);
		 }	
        else
        {
		
	    dbservice.checkexists("profile",{email:email,password:password},function(items){
            res.send({result:items.length,sessionname:items});	   
	      }); 
	   }

	  }

	   //Forgot password
    exports.forgotpassword = function(req, res) {

      var forgotpasswordemail=req.body.forgotpasswordemail;
      var newpassword=req.body.newpassword;

       dbservice.checkexists("profile",{email:forgotpasswordemail},function(items){
             if(items.length == 0)
		    {
		       res.send({status:"0"});
		    }
		    else
		    {
		     dbservice.update("profile",{email:forgotpasswordemail},{$set:{password:newpassword}},function(result){
             });

                 var mailOptions = {
		        from:"nodsem<ess@srsconsultinginc.com>",
		        to:forgotpasswordemail, 
		        subject: "new password", 
		        html: "<b>Your password is reseted your new password is "+newpassword+"</b>" // html body    
                 }  
	
		          transport.sendMail(mailOptions, function(error){
		          if(error){
		             console.log(error.message);
		            return;
		           }
		             console.log('Message sent successfully!');

		          });
               res.send({status:"1"});  

		    }	
          });
    }

 exports.changepassword = function(req, res) {

     var email=req.body.useremail;
     var password=req.body.userpassword;    
     
       dbservice.update("profile",{email:email},{$set:{password:password}},function(result){
        res.sendStatus(result);
       });
 }

 exports.addtask = function(req, res) {

      var taskdetails=req.body;
      var taskname=req.body.taskname;
      var taskdescription=req.body.taskdescription;

      if(taskname == "" || taskdescription == "")
         {
         	res.sendStatus(400);
         }
      else
      	 {

        dbservice.checkexists("task",{taskname:taskname},function(items){
             if(items.length > 0)
		    {
		     res.send({status:"0"});
		    }
		    else
		    {
		     dbservice.save("task",taskdetails,function(result){ 
                 res.send(result);
              });
		    }  	
             
	      });     
     }
   
 }

 exports.retreivetask = function(req, res) {

	 dbservice.read("task",function(items){
              res.send(items);
	 });		

 }

 exports.deletetask = function(req, res) {

   var deletetaskname=req.body.taskname;

   if(deletetaskname == "")
   {
   	 res.sendStatus(400);
   }
   else
   {
      dbservice.deleterecord("task",{taskname:deletetaskname},function(result){
        res.sendStatus(result);
      });
    }

 }

 exports.edittask = function(req, res) {

     var edittaskname=req.body.taskname;
     var edittaskdescription=req.body.taskdescription;

     if(edittaskname == "")
      {
      	 res.sendStatus(400);
      } 	
     else
     {
       dbservice.update("task",{taskname:edittaskname},{$set:{taskdescription:edittaskdescription}},function(result){
        res.sendStatus(result);
       });

     }
 }