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
        const services = client.db('BAIUST').collection('services');
        const studentProfile = client.db('BAIUST').collection('studentProfile');
        const applyCollection = client.db('BAIUST').collection('applyCollection');
        
        

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

    //add services and get services
    app.post('/services', async (req, res) => {
        const review = req.body;
        const c = await services.insertOne(review);
        res.send(c);
    });
    app.get('/services', async (req, res) => {
        let query = {};
        const cursor = services.find(query).limit(0).sort({$natural:-1});
        const a = await cursor.toArray();
        res.send(a); 
    });
    app.get('/services/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const b = await services.findOne(query);
        res.send(b);
    });
    app.get('/servicess', async (req, res) => {
        let query = {};

        if (req.query.category) {
            query = {
                category: req.query.category
            }
        }
        const cursor = services.find(query).sort({$natural:-1});
        const review = await cursor.toArray();
        res.send(review);
    });

    //service query by admin email
    app.get('/serviceAdminEmail', async (req, res) => {
        let query = {};

        if (req.query.adminEmail) {
            query = {
                adminEmail: req.query.adminEmail
            }
        }
        const cursor = services.find(query).sort({$natural:-1});
        const review = await cursor.toArray();
        res.send(review);
    });

    app.delete('/serviceDelete/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await services.deleteOne(query);
        res.send(result);
    })

    //service apply
        //Apply from ServiceCollection
        app.get('/apply/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const b = await services.findOne(query);
            res.send(b);
        });
    
        //Applied in appplyCollection
        app.post('/apply', async (req, res) => {
            const user = req.body;
            const result = await applyCollection.insertOne(user);
            res.send(result);
        });
        app.get('/apply', async (req, res) => {
            let query = {};
            const cursor = applyCollection.find(query);
            const a = await cursor.toArray();
            res.send(a);
        });

        app.get('/applyEmail', async (req, res) => {
            let query = {};
    
            if (req.query.stuUserEmail) {
                query = {
                    stuUserEmail: req.query.stuUserEmail
                }
            }
            const cursor = applyCollection.find(query).sort({$natural:-1});
            const review = await cursor.toArray();
            res.send(review);
        });

        app.get('/appliedCard/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const b = await applyCollection.findOne(query);
            res.send(b);
        });

        //service id for each applicant
        app.get('/serviceId', async (req, res) => {
            let query = {};
    
            if (req.query.sId) {
                query = {
                    sId: req.query.sId
                }
            }
            const cursor = applyCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });

        app.get('/applicant/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const b = await applyCollection.findOne(query);
            res.send(b);
        });

   

    
    //studentProfile
app.post('/studentProfile', async (req, res) => {
    const user = req.body;
    const result = await studentProfile.insertOne(user);
    res.send(result);
});
app.get('/studentProfile', async (req, res) => {
    let query = {};
    const cursor = studentProfile.find(query);
    const a = await cursor.toArray();
    res.send(a);
});
app.get('/studentProfileEmail', async (req, res) => {
    let query = {};

    if (req.query.stuUserEmail) {
        query = {
            stuUserEmail: req.query.stuUserEmail
        }
    }
    const cursor = studentProfile.find(query);
    const review = await cursor.toArray();
    res.send(review);
});

app.delete('/studentProfileDelete/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await studentProfile.deleteOne(query);
    res.send(result);
})

    
    





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