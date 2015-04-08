
var expect = require('expect.js');
var request = require('supertest');
var app = require('../app'); 
var should=require('should');

var url = 'http://localhost:3000'; //server address

//To check signup api
 describe('checking for user signup', function() {

    it('checking for user signup', function(done) {
      var profile = {
        name: 'pradeep',
        username: 'test123',
        email: 'pradeep@test.com',
        password: 'test'
      };

     profile.should.have.property('name');
     profile.name.should.not.equal('');
     profile.should.have.property('username');
     profile.username.should.not.equal('');  
     profile.should.have.property('email');
     profile.email.should.not.equal('');
     profile.should.have.property('password');
     profile.password.should.not.equal(''); 
    request(url)
    .post('/signup')
    .send(profile)
    .expect(200)
    .end(function(err, res){
     if (err) throw err;
     res.body.should.have.property('status');
     done();
      });
    });
});


//To check signin api
 describe('checking for user signin', function() {
    it('checking for user signin', function(done) {
      var profile = {
        email: 'pradeep123@test.com',
        password: 'test'
      };  
     profile.should.have.property('email');
     profile.email.should.not.equal('');
     profile.should.have.property('password');
     profile.password.should.not.equal('');

        request(url)
      .post('/signin')
      .send(profile)
    .expect(200)
    .end(function(err, res){
     if (err) throw err;
     res.body.should.have.property('result');
     res.body.should.have.property('sessionname');
     done();
      });
     });
    });

 describe('checking for adding task', function() {
    it('checking for adding task', function(done) {
      var taskdetails={};
          taskdetails.taskname="two";
          taskdetails.taskdescription="sdfsaj";  

        taskdetails.should.have.property('taskname');
        taskdetails.taskname.should.not.equal('');
        taskdetails.should.have.property('taskdescription');
        taskdetails.taskdescription.should.not.equal('');   
        request(url)
      .post('/addtask')
      .send(taskdetails)
    .expect(200)
    .end(function(err, res){
     if (err) throw err;
     res.body.should.have.property('status');
     done();
      });
   });
  });

  describe('checking for retreiving task details', function() {
    it('checking for retreiving task details', function(done) {   
      request(url)
      .get('/retreivetask')
    .expect(200)
    .end(function(err, res){
     if (err) throw err;
     res.body.should.be.instanceof(Array);
     done();
      });
    });
  });

  describe('checking for deleting task', function() {
    it('checking for deleting task', function(done) {
      var taskdetails={};
          taskdetails.taskname="mytask";

          taskdetails.should.have.property('taskname');
          taskdetails.taskname.should.not.equal('');  
        request(url)
      .post('/deletetask')
      .send(taskdetails)
    .expect(200)
    .end(function(err, res){
     if (err) throw err;
     done();
      });
    });
  });

  describe('checking for editing task', function() {
    it('checking for editing task', function(done) {
      var taskdetails={};
          taskdetails.taskname="mytask";
          taskdetails.taskdescription="mytaskdescription";
         
          taskdetails.should.have.property('taskname');
          taskdetails.taskname.should.not.equal('');   
        request(url)
      .post('/edittask')
      .send(taskdetails)
    .expect(200)
    .end(function(err, res){
     if (err) throw err;
     done();
      });
     });
    });