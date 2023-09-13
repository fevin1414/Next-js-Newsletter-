import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    try {
      const client = await MongoClient.connect(
        'mongodb+srv://fevin:Fevin4321@cluster0.vm8ghse.mongodb.net/test?retryWrites=true&w=majority'
      );
      const db = client.db();
      await db.collection('newsletter').insertOne({ email: userEmail });
      client.close();

      res.status(201).json({ message: 'Signed Up' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Connection error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default handler;
