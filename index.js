const express= require('express');
const connection= require('./config/connection');
const userRouter = require('./routes/user.route');
const auth= require('./middleware/authentication.middleware')
const postRouter = require('./routes/post.route')
const app = express();
app.use(express.json())
app.use('/users',userRouter)
app.use(auth)
app.use('/posts',postRouter)


app.get('/',(req, res)=>{
    res.send('this is home page')
})


app.listen(8080,()=>{
connection()
console.log('listening on port 8080');
})