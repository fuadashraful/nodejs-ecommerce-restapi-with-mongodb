const express=require('express');
const mongoose = require('mongoose');

const app=express();
const userRoute=require('./routes/user');
const authRoute=require('./routes/auth');
const dotenv=require('dotenv');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
  .then((con) => console.log('DB connection successfuly'))
  .catch((err)=>{
      console.log(`error is ${err.message}`);
});

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.listen(process.env.PORT||5000,()=>{
    console.log(`Server is running on 5000`);
})