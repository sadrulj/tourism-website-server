const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ediyn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("tourismDbUser");
    const guidesCollection = database.collection("guide_db");
    const servicesCollection = database.collection("services_db");
    const bookingCollection = database.collection("user_booking_db");

    // GET API Guides
    app.get("/guides", async (req, res) => {
      const cursor = guidesCollection.find({});
      const guides = await cursor.toArray();
      res.send(guides);
    });
    // GET API Guides
    app.get("/guides/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await guidesCollection.findOne(query);
      res.json(result);
    });
    // GET API Services
    app.get("/services", async (req, res) => {
      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });
    // GET API Services id
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollection.findOne(query);
      res.json(result);
    });
    // GET API Booking
    app.get("/booking", async (req, res) => {
      const cursor = bookingCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
    });
    // GET API Services id
    app.get("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookingCollection.findOne(query);
      res.json(result);
    });
    //POST Guides api
    app.post("/guides", async (req, res) => {
      const newItem = req.body;
      const result = await guidesCollection.insertOne(newItem);
      console.log("hitting the post", req.body);
      res.json(result);
    });

    //POST Services api
    app.post("/services", async (req, res) => {
      const newItem = req.body;
      const result = await servicesCollection.insertOne(newItem);
      console.log("hitting the post", req.body);
      res.json(result);
    });
    //POST User api
    app.post("/booking", async (req, res) => {
      const newItem = req.body;
      const result = await bookingCollection.insertOne(newItem);
      console.log("hitting the post", req.body);
      res.json(result);
    });

    //DELETE Services api
    app.delete("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await servicesCollection.deleteOne(query);
      console.log("deleting user with id", result);
      res.json(result);
    });

    //DELETE Guides api
    app.delete("/guides/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await guidesCollection.deleteOne(query);
      console.log("deleting user with id", result);
      res.json(result);
    });
    //DELETE Guides api
    app.delete("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      console.log("deleting user with id", result);
      res.json(result);
    });
  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World! mongodb");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
