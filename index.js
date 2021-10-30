const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

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

    // GET API
    app.get("/guides", async (req, res) => {
      const cursor = guidesCollection.find({});
      const guides = await cursor.toArray();
      res.send(guides);
    });
    // GET API
    app.get("/services", async (req, res) => {
      const cursor = servicesCollection.find({});
      const services = await cursor.toArray();
      res.send(services);
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
