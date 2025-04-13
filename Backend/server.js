const http=require('http');
const app=require('./app');
const cors= require('cors');
app.use(cors());

const mongoose = require('mongoose');
const port=process.env.PORT || 3000;
const server=http.createServer(app);   

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('MongoDB connected'))
.catch((err)=>console.log(err));

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
} )
