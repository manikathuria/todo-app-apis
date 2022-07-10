const tasks = require("./routes/tasks");
const connection = require("./db");
const cors = require("cors");
const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

connection();

app.use(express.json());
app.use(cors());
const user = {
  id:1111,
  name:"John Doe",
}
app.use(require("./routes/tasks"), tasks);
app.post('/login',(req,res)=>{

  const token = jwt.sign({user},process.env.ACCESS_TOKEN_SECRET);
  res.json({
    token
  })

})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));