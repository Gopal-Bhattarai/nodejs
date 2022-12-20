import express from 'express';

const app = express();

app.get('/', (req,res)=>{
    res.send('welcome')
})

app.listen(8088, console.log('Server is running at port 8088'))