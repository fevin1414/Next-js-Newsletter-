function handler(req,res){

  const eventId=req.query.eventId;

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
        id:new Date().toISOString(),
        email,
        name,
        text,
      }
      console.log(newComment);

      res.status(201).json({message:'added Comment.'});
    }

 if(req.method === 'GET'){
const dummyList=[
  {id :'c1',name:'fevin',text:'Dummy comment'},
  {id :'c2',name:'Biju',text:'test comment'},

];
res.status(201).json({comments:dummyList});

 }
}

export default handler;