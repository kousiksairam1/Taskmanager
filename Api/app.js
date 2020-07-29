const express= require('express');
const app= express();
 

const {mongoose} = require('./db/mongoose');
const cors = require('cors')
const bodyParser= require('body-parser')

const {List,Task} = require('./db/models');

// middle ware

app.use(bodyParser.json());
app.use(cors())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); 
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
  
  
  


app.get('/lists',(req,res)=>{
    List.find({}).then((lists)=>{
        res.send(lists);
    });

})

app.post('/lists',(req,res)=>{
    let title = req.body.title;

    let newList = new List({
        title
    });
    newList.save().then((listDoc)=>{
          res.send(listDoc);
    })

}) ;

app.patch('/lists/:id',(req,res)=>{
    List.findOneAndUpdate({_id: req.params.id},{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);

    });

});

app.delete('/lists/:id',(req,res)=>{

    List.findOneAndRemove({
        _id:req.params.id

    }).then((removedListDoc)=>{
        res.send(removedListDoc);
    })

});


app.get('/list/:listId/tasks',(req,res)=>{
    Task.find({
        _listId: req.param._listId
    }).then((tasks)=>{
        res.send(tasks);
    })
    });

app.get('/lists/:listId/tasks',(req,res)=>{
    Task.find({
        _listId: req.params.listId
    }).then((tasks)=>{
        res.send(tasks);
    })
}
);

    app.post('/lists/:listId/tasks',(req,res)=>{
    let newTask= new Task({
        title: req.body.title,
        _listId:req.params.listId
    });
    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    })
 } );

 app.path('/lists/:listId/tasks/:taskId', (req,res)=>{
     Task.findOneAndUpdate({
         _id: req.params.taskId,
         _listId: req.params.listId
     }, {
         $set: req.body
     }
     ).then (()=>{
         res.sendStatus(200);
     })
     });
 
app.delete('/list/:listId/tasks/:taskId',(req,res)=>{
     Task.findOneAndRemove({
         _id:req.params.taskId,
         _listId:req.params.listId
     }).then((removeTaskDoc) =>{
         res.send(removedtaskDoc);
     })
     
     
});
 
 
 



app.listen(3000,() =>{
    console.log("server is listening on the port 3000")
})