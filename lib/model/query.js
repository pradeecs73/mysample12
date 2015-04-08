var db=require('./databaseoperations');

var datbasefunctions={

read:function(collectionname,callback)
{

    db.collection(collectionname, function(err, collection) {
        collection.find().toArray(function(err, items) {
      if (err) {
                callback(400);
            }
            else{
             callback(items);
            }
        
        });
    });
  
},

save:function(collectionname,query,callback)
{

db.collection(collectionname, function(err, collection) {
        collection.insert(query, {safe:true}, function(err, result) {
            if (err) {
                callback(400);
            } else {
                callback({status:"1"});
            }
        });
    });

},

deleterecord:function(collectionname,query,callback)
{

 db.collection(collectionname, function(err, collection) {        
    collection.remove(query,function(err, result) { 
    if (err) {
         callback(400);
    } 
    else 
    {
       callback(200);
     }  
      
      }); 
    });

},

checkexists:function(collectionname,query,callback)
{

  db.collection(collectionname, function(err, collection) {
    collection.find(query).toArray(function(err, items) {   
        if (err) {
             callback(400);
            }
        else{
            callback(items);
            }
        });
      });
},

update:function(collectionname,query,query1,callback)
{

   db.collection(collectionname, function(err, collection) {        
       collection.update(query,query1,{ upsert: false },function(err, result) { 
    if (err) {
         callback(400);
    } 
    else 
     {
         callback(200);
     }  
      
      });  
    });

}

};

module.exports = datbasefunctions;