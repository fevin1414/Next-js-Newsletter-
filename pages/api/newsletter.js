import {MongoClient} from 'mongodb'
async  function handler(req,res){
  if(req.method === 'POST'){
   const userEmail= req.body.email;

   if(!userEmail || ! userEmail.includes('@')){
    res.status(422).json({message:'Invalid email address'})
    return;
   }
   const client = await MongoClient.connect(
    'mongodb+srv://fevin:Fevin4321@cluster0.vm8ghse.mongodb.net/newsletter?retryWrites=true&w=majority'
  );
 const db=  client.db();
   await db.collection('newsletter').insertOne({email:userEmail});
   client.close();

   res.status(201).json({message: 'Signed Up'})
  }
}

export default handler;