const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rhkgk.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run(){
    try{
        const menuCollection = client.db('SJ-Coffee-House').collection('menu');

        app.get('/menu',async(req,res)=>{
            const query = {};
            const menu = await menuCollection.find(query).toArray();
            res.send(menu);
        })
    }
    finally{

    }
}
run().catch(console.log)




app.get('/',async(req,res)=>{
    res.send("sj server is running.");
})

app.listen(port, ()=>console.log(`SJ coffee house running on ${port}`));