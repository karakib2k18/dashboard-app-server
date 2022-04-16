const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
// const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const ObjectId = require("mongodb").ObjectId;

//middleware
app.use(cors());
app.use(express.json());

//dashboard
//o6xs18JcYdJHc9Ef

const uri = `mongodb+srv://dashboard:o6xs18JcYdJHc9Ef@cluster0.3zctf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// console.log(uri)

async function run() {
  try {
    await client.connect();
    const database = client.db("dashboard");
    const addstudentCollection = database.collection("addstudent");
    const viewstudentCollection = database.collection("viewstudent");


    //get all products
    app.get("/addstudent", async (req, res) => {
      const result = await addstudentCollection.find({}).toArray();
      res.json(result);
    });

    app.post("/addstudent", async (req, res) => {
      const addstudent = req.body;
      const result = await addstudentCollection.insertOne(addstudent);
      res.json(result);
    });
    //DELETE  USING OBJECT ID
    app.delete("/addstudent/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await addstudentCollection.deleteOne(query);
      res.json(result);
    });

    // //UPDATE PUT API for Staus
    app.put("/addstudent/:id", async (req, res) => {
      console.log(req.body);
      const id = req.body._id;
      let updateName = req.body.name;
      let updateAge = req.body.age;
      let updateSchool = req.body.school;
      let updateClassa = req.body.classa;
      let updateDivision = req.body.division;
      let updateStatus = req.body.status;
      const filter = { _id: ObjectId(req.body._id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: { name: updateName },
        $set: { age: updateAge },
        $set: { school: updateSchool },
        $set: { classa: updateClassa },
        $set: { division: updateDivision },
        $set: { status: updateStatus },
      };
      const result = await addstudentCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    //GET API by ID
    app.get("/addstudent/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await addstudentCollection.findOne(query);
      res.json(result);
    });
  } finally {
    //   await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Dashboard! APP");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//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
