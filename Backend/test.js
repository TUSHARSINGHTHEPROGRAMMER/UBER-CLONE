const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://root:htveP85HEeRnNmd4@findashdb.7j2p1.mongodb.net/";
const client = new MongoClient(uri);

async function dropCollections() {
  try {
    await client.connect();
    const db = client.db("findashdb");

    const collections = await db.listCollections().toArray();
    for (const { name } of collections) {
      await db.collection(name).drop();
      console.log(`🗑️ Dropped collection: ${name}`);
    }

    console.log("✅ All collections dropped successfully.");
  } catch (err) {
    console.error("❌ Error dropping collections:", err);
  } finally {
    await client.close();
  }
}

dropCollections();
