const express = require('express');

const dbconnect = require('./mongodb');
const app = express();
const mongodb = require('mongodb');

const PORT = process.env.PORT || 4000;

app.use(express.json());


app.get('/', async(req, resp)=>{
    let data = await dbconnect();
    data = await data.find().toArray();
    resp.send(data)
});

app.post('/',async(req, resp)=>{ 
    let data = await dbconnect();
    let result = await data.insertOne(req.body);
    resp.send(result);
});
app.put('/:model', async(req, resp)=>{
    let data = await dbconnect();
    let result = data.updateOne(
        {name:req.params.model},
        {$set:req.body}
    )
    resp.send({result: "updated"})
});

app.delete('/:id', async(req, resp)=>{
    console.log(req.params.id)
    let data = await dbconnect();
    let result = await data.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    resp.send(result)
})


app.listen(PORT, ()=>{
    console.log(`Server listening on the port ${PORT}`)
});