import {MongoClient} from 'mongodb';
export async function handler(req,res){

  const eventId=req.query.eventId;
const client=await MongoClient.connect( 'mongodb+srv://fevin:Fevin4321@cluster0.vm8ghse.mongodb.net/events?retryWrites=true&w=majority');
  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;}
      console.log(email,name,text);
      const newComment={

        email,
        name,
        text,
        eventId
      }
      const db=client.db();
   const result=await db.collection('comments').insertOne(newComment);


      console.log(newComment);
      newComment.id=result.insertedId;

      res.status(201).json({message:'added Comment.'});
    }

 if(req.method === 'GET'){

 const db=client.db();

const documents=await db.collection('comments').find().sort({_id:-1}).toArray();
res.status(201).json({comments:documents});

 }
 client.close();
}

export default handler;