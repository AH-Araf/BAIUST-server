const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


// middle wares
app.use(cors());
app.use(express.json()); 



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xbkhg1t.mongodb.net/?retryWrites=true&w=majority`;
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
        const usersCollection = client.db('BAIUST').collection('users');
        

    //users
    app.post('/users', async (req, res) => {
        const user = req.body;
        const result = await usersCollection.insertOne(user);
        res.send(result);
    });
    app.get('/users', async (req, res) => {
        let query = {};
        const cursor = usersCollection.find(query);
        const a = await cursor.toArray();
        res.send(a);
    });
    app.get('/email', async (req, res) => {
        let query = {};

        if (req.query.email) {
            query = {
                email: req.query.email
            }
        }
        const cursor = usersCollection.find(query);
        const review = await cursor.toArray();
        res.send(review);
    });
    

    
    





    }
    finally{

    }
}

run().catch(err => console.error(err))


app.get('/',(req,res)=>{
    res.send('BAIUST Server Running')
})

app.listen(port, ()=>{
    console.log(`BAIUST Server Running${port}`)
})