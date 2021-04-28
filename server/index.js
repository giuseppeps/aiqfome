const express  = require('express');
const mongoose = require('mongoose');

const app = express();
const Port = process.env.Port || 3030;

const Uri = 'mongodb+srv://dbUser:dbUser@clusteraiq.pe7ab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectDB = async () => {
  await mongoose.connect(Uri, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  console.log('BD conectado');
}

connectDB();

app.listen(Port, () => console.log(`Servidor na porta ${Port}`));