const express = require('express');
const dbconnect = require('./mongodb');
const app = express();

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
app.put('/:name', async(req, resp)=>{
    let data = await dbconnect();
    let result = data.updateOne(
        {name:req.params.name},
        {$set:req.body}
    )
    resp.send({result: "updated"})
})


app.listen(PORT, ()=>{
    console.log(`Server listening on the port ${PORT}`)
});